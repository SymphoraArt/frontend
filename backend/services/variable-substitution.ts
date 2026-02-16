import { decryptPrompt, type EncryptedData } from '../encryption';
import type { VariableValue } from '../database/schema';

export interface SubstitutionResult {
  success: boolean;
  finalPrompt?: string;
  errors?: string[];
}

/**
 * Substitutes variables in prompt template (encrypted or plain text)
 *
 * @param encryptedPromptOrTemplate - Encrypted prompt data or plain template string with [variableName] placeholders
 * @param variableValues - Array of variable values from user input
 * @param variableDefinitions - Variable definitions from prompt metadata (optional for now)
 * @returns Decrypted prompt with all variables substituted
 */
export async function substituteVariables(
  encryptedPromptOrTemplate: EncryptedData | string,
  variableValues: VariableValue[],
  variableDefinitions: any[] = []
): Promise<SubstitutionResult> {
  try {
    // 1. Get the prompt template (decrypt if encrypted, use as-is if string)
    const promptTemplate =
      typeof encryptedPromptOrTemplate === "string"
        ? encryptedPromptOrTemplate
        : decryptPrompt(encryptedPromptOrTemplate);

    // 2. Validate all required variables are provided
    const validation = validateVariables(variableValues, variableDefinitions);
    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    // 3. Create substitution map (uses definitions for checkbox checkedValue/uncheckedValue)
    const substitutionMap = createSubstitutionMap(variableValues, variableDefinitions);

    // 4. Perform substitution
    let finalPrompt = promptTemplate;

    for (const [variableName, value] of Object.entries(substitutionMap)) {
      const placeholder = `[${variableName}]`;
      const definition = variableDefinitions?.find((d: any) => d.name === variableName);
      const stringValue = formatVariableValue(value, definition);

      finalPrompt = finalPrompt.split(placeholder).join(stringValue);
    }

    // 5. Check for any unreplaced variables
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

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      errors: [`Substitution failed: ${errorMessage}`]
    };
  }
}

/**
 * Validates that all required variables are provided
 */
function validateVariables(
  values: VariableValue[],
  definitions: any[]
): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  // If no definitions provided, accept all variables
  if (!definitions || definitions.length === 0) {
    return { valid: true };
  }

  // Check required variables
  const requiredVars = definitions.filter(v => v.required !== false);
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
  definition: any
): { valid: boolean; error?: string } {
  const { value: varValue } = value;

  switch (definition.type) {
    case 'text':
      if (typeof varValue !== 'string') {
        return { valid: false, error: `${value.variableName} must be a string` };
      }
      if (definition.minLength && varValue.length < definition.minLength) {
        return { valid: false, error: `${value.variableName} must be at least ${definition.minLength} characters` };
      }
      if (definition.maxLength && varValue.length > definition.maxLength) {
        return { valid: false, error: `${value.variableName} must be at most ${definition.maxLength} characters` };
      }
      break;

    case 'slider':
    case 'number':
      if (typeof varValue !== 'number') {
        return { valid: false, error: `${value.variableName} must be a number` };
      }
      if (definition.min !== undefined && varValue < definition.min) {
        return { valid: false, error: `${value.variableName} must be at least ${definition.min}` };
      }
      if (definition.max !== undefined && varValue > definition.max) {
        return { valid: false, error: `${value.variableName} must be at most ${definition.max}` };
      }
      break;

    case 'checkbox':
    case 'boolean':
      if (typeof varValue !== 'boolean') {
        return { valid: false, error: `${value.variableName} must be a boolean` };
      }
      break;

    case 'single-select':
      if (typeof varValue !== 'string') {
        return { valid: false, error: `${value.variableName} must be a string` };
      }
      if (definition.options && !definition.options.includes(varValue)) {
        return {
          valid: false,
          error: `${value.variableName} must be one of: ${definition.options.join(', ')}`
        };
      }
      break;

    case 'multi-select':
      if (!Array.isArray(varValue)) {
        return { valid: false, error: `${value.variableName} must be an array` };
      }
      if (definition.options) {
        const invalidOptions = (varValue as string[]).filter(
          v => !definition.options.includes(v)
        );
        if (invalidOptions.length > 0) {
          return {
            valid: false,
            error: `${value.variableName} contains invalid options: ${invalidOptions.join(', ')}`
          };
        }
      }
      break;

    default:
      // Allow unknown types for flexibility
      break;
  }

  return { valid: true };
}

/**
 * Creates a map of variable names to their raw values (for substitution).
 * Definitions are used when formatting checkbox values.
 */
function createSubstitutionMap(
  values: VariableValue[],
  definitions: any[] = []
): Record<string, any> {
  const map: Record<string, any> = {};

  for (const { variableName, value } of values) {
    map[variableName] = value;
  }

  return map;
}

/**
 * Formats variable value for insertion into prompt.
 * For checkbox type: when checked use config.checkedValue, when unchecked use config.uncheckedValue (or "").
 */
function formatVariableValue(value: any, definition?: any): string {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (typeof value === 'boolean' && definition?.type === 'checkbox') {
    return value
      ? (definition.config?.checkedValue ?? '')
      : (definition.config?.uncheckedValue ?? '');
  }

  if (typeof value === 'boolean') {
    return value ? 'yes' : 'no';
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  return String(value);
}

/**
 * Finds any unreplaced variable placeholders in the final prompt
 */
function findUnreplacedVariables(prompt: string): string[] {
  const regex = /\[([^\]]+)\]/g;
  const matches = [...prompt.matchAll(regex)];
  const variables = matches.map(m => m[1]);
  // Return unique variables only
  return [...new Set(variables)];
}

// Export for testing
export const testUtils = {
  validateVariables,
  validateVariableType,
  formatVariableValue,
  findUnreplacedVariables
};
