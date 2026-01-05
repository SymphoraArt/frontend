/**
 * Variable Substitution Service
 *
 * Handles replacing variable placeholders in prompts with actual user values.
 * Integrates with database to fetch variable definitions for validation.
 */

import { decryptPrompt, type EncryptedData } from '../encryption';
import type { VariableValue } from '../database/schema';

// Re-export for convenience
export type { VariableValue } from '../database/schema';

// Variable value type - matches VariableValue from schema
export type VariableValueType = string | number | boolean | string[];

// Local type definitions
export interface Variable {
  id?: string;
  name: string;
  type: 'text' | 'slider' | 'checkbox' | 'select' | 'multi-select' | 'single-select' | 'radio';
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; promptValue: string }[];
  defaultValue?: VariableValueType;
}

export interface Prompt {
  id?: string;
  title?: string;
  description?: string;
  price?: string; // Price in LYX
  creatorAddress?: string; // LUKSO address for payments
  variables: Variable[];
  // For encrypted prompts
  encryptedContent?: string;
  encrypted?: string; // Alternative property name for encrypted content
  iv?: string;
  authTag?: string;
  template?: string;
  content?: string;
}

// Storage interface for future extensibility
export interface IStorage {
  uploadFile(file: Buffer, filename: string): Promise<string>;
  getFileUrl(filename: string): string;
  getVariablesByPromptId(promptId: string): Promise<Variable[]>;
}

export interface SubstitutionResult {
  success: boolean;
  finalPrompt?: string;
  errors?: string[];
  unreplacedVariables?: string[];
}

/**
 * Substitutes variables in encrypted prompt template using database definitions
 *
 * @param prompt - The prompt record from database (with encrypted content and variables)
 * @param variableValues - User-provided variable values
 * @param storage - Storage instance for fetching variable definitions
 * @returns Substitution result with final prompt or errors
 */
export async function substituteVariablesWithPrompt(
  prompt: Prompt,
  variableValues: VariableValue[],
  storage: IStorage
): Promise<SubstitutionResult> {
  try {
    // 1. Decrypt the prompt template
    const encryptedData: EncryptedData = {
      encrypted: prompt.encryptedContent || prompt.encrypted || '',
      iv: prompt.iv || '',
      authTag: prompt.authTag || ''
    };

    const promptTemplate = decryptPrompt(encryptedData);

    // 2. Fetch variable definitions from database
    const variableDefinitions = await storage.getVariablesByPromptId(prompt.id!);

    // 3. Perform substitution
    return substituteVariables(promptTemplate, variableValues, variableDefinitions);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      errors: [`Failed to process prompt: ${errorMessage}`]
    };
  }
}

/**
 * Substitutes variables in prompt template
 *
 * @param promptTemplate - The decrypted prompt template with [variableName] placeholders
 * @param variableValues - Array of variable values from user input
 * @param variableDefinitions - Variable definitions from database
 * @returns Substitution result with final prompt or errors
 */
export function substituteVariables(
  promptTemplate: string,
  variableValues: VariableValue[],
  variableDefinitions: Variable[]
): SubstitutionResult {
  try {
    // 1. Validate all required variables are provided
    const validation = validateVariables(variableValues, variableDefinitions);
    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    // 2. Create substitution map
    const substitutionMap = createSubstitutionMap(variableValues);

    // 3. Perform substitution
    let finalPrompt = promptTemplate;

    for (const [variableName, value] of Object.entries(substitutionMap)) {
      // Replace all instances of [variableName] with actual value
      const placeholder = `[${variableName}]`;
      const stringValue = formatVariableValue(value);

      // Use global replace to handle multiple instances
      finalPrompt = finalPrompt.split(placeholder).join(stringValue);
    }

    // 4. Check for any unreplaced variables
    const unreplacedVars = findUnreplacedVariables(finalPrompt);
    if (unreplacedVars.length > 0) {
      return {
        success: false,
        errors: [`Unreplaced variables: ${unreplacedVars.join(', ')}`]
      };
    }

    return {
      success: true,
      finalPrompt: finalPrompt.trim()
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      errors: [`Substitution failed: ${errorMessage}`]
    };
  }
}

/**
 * Validates that all required variables are provided and match their types
 */
function validateVariables(
  values: VariableValue[],
  definitions: Variable[]
): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  // Check required variables
  const requiredVars = definitions.filter(v => v.required);
  const providedVarNames = values.map(v => v.variableName);

  for (const required of requiredVars) {
    if (!providedVarNames.includes(required.name)) {
      errors.push(`Required variable "${required.name}" not provided`);
    }
  }

  // Validate variable types and constraints
  for (const value of values) {
    const definition = definitions.find(d => d.name === value.variableName);
    if (!definition) {
      errors.push(`Unknown variable "${value.variableName}"`);
      continue;
    }

    const typeValidation = validateVariableType(value, definition);
    if (!typeValidation.valid) {
      errors.push(typeValidation.error!);
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * Validates variable value matches its type definition
 */
function validateVariableType(
  value: VariableValue,
  definition: Variable
): { valid: boolean; error?: string } {
  switch (definition.type) {
    case 'text':
      if (typeof value.value !== 'string') {
        return { valid: false, error: `${value.variableName} must be a string` };
      }
      break;

    case 'slider':
      if (typeof value.value !== 'number') {
        return { valid: false, error: `${value.variableName} must be a number` };
      }
      if (definition.min !== undefined && value.value < definition.min) {
        return {
          valid: false,
          error: `${value.variableName} must be at least ${definition.min}`
        };
      }
      if (definition.max !== undefined && value.value > definition.max) {
        return {
          valid: false,
          error: `${value.variableName} must be at most ${definition.max}`
        };
      }
      break;

    case 'checkbox':
      if (typeof value.value !== 'boolean') {
        return { valid: false, error: `${value.variableName} must be a boolean` };
      }
      break;

    case 'single-select':
    case 'radio':
      if (typeof value.value !== 'string') {
        return { valid: false, error: `${value.variableName} must be a string` };
      }
      if (definition.options) {
        const validOptions = definition.options.map(opt => opt.promptValue);
        if (!validOptions.includes(value.value as string)) {
          return {
            valid: false,
            error: `${value.variableName} must be one of: ${validOptions.join(', ')}`
          };
        }
      }
      break;

    case 'multi-select':
      if (!Array.isArray(value.value)) {
        return { valid: false, error: `${value.variableName} must be an array` };
      }
      if (definition.options) {
        const validOptions = definition.options.map(opt => opt.promptValue);
        const invalidOptions = (value.value as string[]).filter(
          v => !validOptions.includes(v)
        );
        if (invalidOptions.length > 0) {
          return {
            valid: false,
            error: `${value.variableName} contains invalid options: ${invalidOptions.join(', ')}`
          };
        }
      }
      break;
  }

  return { valid: true };
}

/**
 * Creates a map of variable names to their formatted values
 */
function createSubstitutionMap(values: VariableValue[]): Record<string, VariableValueType> {
  const map: Record<string, VariableValueType> = {};

  for (const { variableName, value } of values) {
    map[variableName] = value;
  }

  return map;
}

/**
 * Formats variable value for insertion into prompt
 */
function formatVariableValue(value: VariableValueType): string {
  if (Array.isArray(value)) {
    // Multi-select: join with commas
    return value.join(', ');
  }

  if (typeof value === 'boolean') {
    // Checkbox: convert to yes/no
    return value ? 'yes' : 'no';
  }

  if (typeof value === 'number') {
    // Slider: convert to string
    return value.toString();
  }

  // String values
  return String(value);
}

/**
 * Finds any unreplaced variable placeholders in the final prompt
 */
export function validateVariableValues(values: VariableValue[], definitions: Variable[]): string[] {
  const errors: string[] = [];
  const valueMap = new Map(values.map(v => [v.variableName, v.value]));

  for (const def of definitions) {
    const value = valueMap.get(def.name);

    // Check required fields
    if (def.required && (value === undefined || value === null || value === '')) {
      errors.push(`Required variable "${def.name}" not provided`);
      continue;
    }

    if (value === undefined || value === null) continue;

    // Type-specific validation
    switch (def.type) {
      case 'slider':
        const numValue = Number(value);
        if (isNaN(numValue)) {
          errors.push(`${def.name} must be a valid number`);
        } else {
          if (def.min !== undefined && numValue < def.min) {
            errors.push(`${def.name} must be at least ${def.min}`);
          }
          if (def.max !== undefined && numValue > def.max) {
            errors.push(`${def.name} must be at most ${def.max}`);
          }
        }
        break;

      case 'select':
        if (def.options && !def.options.some(opt => opt.promptValue === value)) {
          errors.push(`${def.name} must be one of: ${def.options.map(o => o.promptValue).join(', ')}`);
        }
        break;

      case 'multi-select':
        if (Array.isArray(value)) {
          if (def.options) {
            const invalidValues = value.filter(v => !def.options!.some(opt => opt.promptValue === v));
            if (invalidValues.length > 0) {
              errors.push(`${def.name} contains invalid values: ${invalidValues.join(', ')}`);
            }
          }
        } else {
          errors.push(`${def.name} must be an array for multi-select`);
        }
        break;

      case 'checkbox':
        if (typeof value !== 'boolean') {
          errors.push(`${def.name} must be true or false`);
        }
        break;

      case 'text':
        if (typeof value !== 'string') {
          errors.push(`${def.name} must be a string`);
        }
        break;
    }
  }

  return errors;
}

export function findUnreplacedVariables(prompt: string, replaced?: Set<string>): string[] {
  const regex = /\[([^\]]+)\]/g;
  const matches = [...prompt.matchAll(regex)];
  const allVariables = matches.map(m => m[1]);

  if (!replaced || replaced.size === 0) {
    return allVariables;
  }

  return allVariables.filter(variable => !replaced.has(variable));
}

// Export for testing
export const testUtils = {
  validateVariables,
  validateVariableType,
  formatVariableValue,
  findUnreplacedVariables
};
