import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  substituteVariables,
  findUnreplacedVariables,
  validateVariableValues,
  type VariableValue,
  type Variable,
} from '../variable-substitution.js';

describe('Variable Substitution Service - Unit Tests', () => {
  describe('substituteVariables', () => {
    it('should substitute simple text variables', () => {
      const template = 'A [color] [object] in the sky';
      const variableValues = [
        { variableName: 'color', value: 'red' },
        { variableName: 'object', value: 'balloon' },
      ];
      const definitions = [
        {
          id: 'var-1',
          name: 'color',
          type: 'text' as const,
          required: true,
          label: 'Color',
        },
        {
          id: 'var-2',
          name: 'object',
          type: 'text' as const,
          required: true,
          label: 'Object',
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(true);
      expect(result.finalPrompt).toBe('A red balloon in the sky');
      expect(result.errors).toHaveLength(0);
    });

    it('should handle select variables', () => {
      const template = 'Create a [style] image';
      const variableValues = [
        { variableName: 'style', value: 'realistic' },
      ];
      const definitions = [
        {
          name: 'style',
          type: 'select' as const,
          required: true,
          label: 'Style',
          options: [
            { label: 'Realistic', promptValue: 'realistic' },
            { label: 'Cartoon', promptValue: 'cartoon' },
          ],
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(true);
      expect(result.finalPrompt).toBe('Create a realistic image');
    });

    it('should handle multi-select variables', () => {
      const template = 'Image with [effects]';
      const variableValues = [
        { variableName: 'effects', value: ['shadows', 'highlights', 'depth'] },
      ];
      const definitions = [
        {
          name: 'effects',
          type: 'multi-select' as const,
          required: true,
          label: 'Effects',
          options: [
            { label: 'Shadows', promptValue: 'shadows' },
            { label: 'Highlights', promptValue: 'highlights' },
            { label: 'Depth', promptValue: 'depth' },
          ],
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(true);
      expect(result.finalPrompt).toBe('Image with shadows, highlights, depth');
    });

    it('should handle slider variables', () => {
      const template = 'Intensity level [intensity]';
      const variableValues = [
        { variableName: 'intensity', value: 7 },
      ];
      const definitions = [
        {
          name: 'intensity',
          type: 'slider' as const,
          required: true,
          label: 'Intensity',
          min: 1,
          max: 10,
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(true);
      expect(result.finalPrompt).toBe('Intensity level 7');
    });

    it('should handle checkbox variables', () => {
      const template = 'Make it [enhanced] enhanced';
      const variableValues = [
        { variableName: 'enhanced', value: true },
      ];
      const definitions = [
        {
          name: 'enhanced',
          type: 'checkbox' as const,
          required: false,
          label: 'Enhanced',
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(true);
      expect(result.finalPrompt).toBe('Make it yes enhanced');
    });

    it('should validate required variables', () => {
      const template = 'A [color] house';
      const variableValues: VariableValue[] = []; // Missing required variable
      const definitions: Variable[] = [
        {
          id: 'var-1',
          name: 'color',
          type: 'text' as const,
          required: true,
          label: 'Color',
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Required variable "color" not provided');
    });

    it('should validate slider ranges', () => {
      const template = 'Level [intensity]';
      const variableValues = [
        { variableName: 'intensity', value: 15 }, // Above max
      ];
      const definitions = [
        {
          name: 'intensity',
          type: 'slider' as const,
          required: true,
          label: 'Intensity',
          min: 1,
          max: 10,
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('intensity must be at most 10');
    });

    it('should validate select options', () => {
      const template = 'Style: [style]';
      const variableValues = [
        { variableName: 'style', value: 'invalid' }, // Not in options
      ];
      const definitions = [
        {
          name: 'style',
          type: 'select' as const,
          required: true,
          label: 'Style',
          options: [
            { label: 'Realistic', promptValue: 'realistic' },
            { label: 'Cartoon', promptValue: 'cartoon' },
          ],
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('style must be one of: realistic, cartoon');
    });

    it('should handle missing definitions gracefully', () => {
      const template = 'A [color] house';
      const variableValues: VariableValue[] = [
        { variableName: 'color', value: 'blue' },
      ];
      const definitions: Variable[] = []; // No definitions provided

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('No variable definitions provided');
    });

    it('should detect unreplaced variables', () => {
      const template = 'A [color] [shape] house';
      const variableValues = [
        { variableName: 'color', value: 'blue' },
        // Missing 'shape' variable
      ];
      const definitions = [
        {
          name: 'color',
          type: 'text' as const,
          required: true,
          label: 'Color',
        },
        {
          name: 'shape',
          type: 'text' as const,
          required: true,
          label: 'Shape',
        },
      ];

      const result = substituteVariables(template, variableValues, definitions);

      expect(result.success).toBe(false);
      expect(result.unreplacedVariables).toContain('shape');
    });
  });

  describe('findUnreplacedVariables', () => {
    it('should find all unreplaced variables', () => {
      const prompt = 'A [color] [object] with [color] details';
      const replaced = new Set(['color']);

      const unreplaced = findUnreplacedVariables(prompt, replaced);

      expect(unreplaced).toEqual(['object']);
    });

    it('should return empty array when all variables are replaced', () => {
      const prompt = 'A red balloon in the sky';
      const replaced = new Set<string>();

      const unreplaced = findUnreplacedVariables(prompt, replaced);

      expect(unreplaced).toEqual([]);
    });

    it('should handle malformed variable syntax', () => {
      const prompt = 'A [color house';
      const replaced = new Set<string>();

      const unreplaced = findUnreplacedVariables(prompt, replaced);

      expect(unreplaced).toEqual([]); // Should not crash
    });
  });

  describe('validateVariableValues', () => {
    it('should validate all variable types successfully', () => {
      const variableValues: VariableValue[] = [
        { variableName: 'text', value: 'hello' },
        { variableName: 'slider', value: 5 },
        { variableName: 'select', value: 'option1' },
        { variableName: 'multi', value: ['opt1', 'opt2'] },
        { variableName: 'checkbox', value: true },
      ];
      const definitions: Variable[] = [
        { id: 'var-1', name: 'text', type: 'text' as const, required: true, label: 'Text' },
        { id: 'var-2', name: 'slider', type: 'slider' as const, required: true, label: 'Slider', min: 1, max: 10 },
        {
          id: 'var-3',
          name: 'select',
          type: 'select' as const,
          required: true,
          label: 'Select',
          options: [{ label: 'Option 1', promptValue: 'option1' }]
        },
        {
          id: 'var-4',
          name: 'multi',
          type: 'multi-select' as const,
          required: true,
          label: 'Multi',
          options: [
            { label: 'Opt 1', promptValue: 'opt1' },
            { label: 'Opt 2', promptValue: 'opt2' }
          ]
        },
        { id: 'var-5', name: 'checkbox', type: 'checkbox' as const, required: true, label: 'Checkbox' },
      ];

      const errors = validateVariableValues(variableValues, definitions);

      expect(errors).toHaveLength(0);
    });

    it('should collect multiple validation errors', () => {
      const variableValues: VariableValue[] = [
        // Missing required variable - not included in array
        { variableName: 'invalid', value: 20 }, // Above max
        { variableName: 'wrong', value: 'invalid' }, // Not in options
      ];
      const definitions: Variable[] = [
        { id: 'var-1', name: 'missing', type: 'text' as const, required: true, label: 'Missing' },
        { id: 'var-2', name: 'invalid', type: 'slider' as const, required: true, label: 'Invalid', min: 1, max: 10 },
        {
          id: 'var-3',
          name: 'wrong',
          type: 'select' as const,
          required: true,
          label: 'Wrong',
          options: [{ label: 'Valid', promptValue: 'valid' }]
        },
      ];

      const errors = validateVariableValues(variableValues, definitions);

      expect(errors).toHaveLength(3);
      expect(errors).toContain('Required variable "missing" not provided');
      expect(errors).toContain('invalid must be at most 10');
      expect(errors).toContain('wrong must be one of: valid');
    });
  });
});
