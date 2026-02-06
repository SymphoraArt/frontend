import { Router, Request, Response } from 'express';
import { getSupabaseClient } from '../database/db.js';
import { substituteVariables } from '../services/variable-substitution.js';
import { encryptPrompt, decryptPrompt } from '../encryption.js';
import type { VariableValue, GenerationSettings, InsertGeneration } from '../database/schema.js';

const router = Router();

/**
 * POST /api/generations
 *
 * Creates a new generation request with variable substitution
 *
 * Request body:
 * {
 *   userId: string;
 *   promptId: string;
 *   encryptedPrompt: string; // The encrypted prompt template
 *   iv: string; // Encryption IV
 *   authTag: string; // Encryption auth tag
 *   variableValues: VariableValue[];
 *   settings: GenerationSettings;
 * }
 */
router.post('/generations', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      promptId,
      encryptedPrompt,
      iv,
      authTag,
      variableValues,
      settings
    } = req.body;

    // 1. Validate request
    if (!userId || !promptId || !encryptedPrompt) {
      return res.status(400).json({
        error: 'Missing required fields: userId, promptId, encryptedPrompt'
      });
    }

    // 2. Substitute variables
    const substitution = await substituteVariables(
      {
        encryptedContent: encryptedPrompt,
        iv,
        authTag
      },
      variableValues || [],
      [] // TODO: Fetch variable definitions from database when available
    );

    if (!substitution.success) {
      return res.status(400).json({
        error: 'Variable substitution failed',
        details: substitution.errors
      });
    }

    // 3. Encrypt final prompt for storage
    const encryptedFinalPrompt = encryptPrompt(substitution.finalPrompt!);

    // 4. Prepare generation data
    const generationData: InsertGeneration = {
      userId,
      promptId,
      finalPrompt: encryptedFinalPrompt.encryptedContent,
      finalPromptIv: encryptedFinalPrompt.iv,
      finalPromptAuthTag: encryptedFinalPrompt.authTag,
      variableValues: variableValues || [],
      settings: settings || {},
      status: 'payment_verified', // For testing, assume payment is verified
      paymentVerified: false,
      retryCount: 0,
    };

    // 5. Store in database
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('generations')
      .insert([generationData])
      .select('id, user_id, prompt_id, status, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        error: 'Failed to create generation',
        details: error.message
      });
    }

    // 6. Return generation ID and status
    res.status(201).json({
      success: true,
      generationId: data.id,
      status: data.status,
      message: 'Generation created and variables substituted successfully'
    });

  } catch (error: any) {
    console.error('Error creating generation:', error);
    res.status(500).json({
      error: 'Failed to create generation',
      details: error.message
    });
  }
});

/**
 * GET /api/generations/:id
 *
 * Retrieves generation details
 *
 * Query params:
 * - decrypt: boolean (if true, returns decrypted final prompt)
 */
router.get('/generations/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { decrypt: shouldDecrypt } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Generation ID is required' });
    }

    // 1. Fetch generation from database
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('generations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Generation not found' });
    }

    // 2. Build response
    const response: any = {
      id: data.id,
      userId: data.user_id,
      promptId: data.prompt_id,
      status: data.status,
      variableValues: data.variable_values,
      settings: data.settings,
      imageUrls: data.image_urls,
      paymentVerified: data.payment_verified,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      completedAt: data.completed_at,
      errorMessage: data.error_message,
    };

    // 3. Optionally decrypt final prompt
    if (shouldDecrypt === 'true') {
      try {
        const decryptedPrompt = decryptPrompt({
          encryptedContent: data.final_prompt,
          iv: data.final_prompt_iv,
          authTag: data.final_prompt_auth_tag
        });
        response.finalPrompt = decryptedPrompt;
      } catch (error: any) {
        return res.status(500).json({
          error: 'Failed to decrypt prompt',
          details: error.message
        });
      }
    }

    res.json(response);

  } catch (error: any) {
    console.error('Error fetching generation:', error);
    res.status(500).json({
      error: 'Failed to fetch generation',
      details: error.message
    });
  }
});

/**
 * GET /api/generations/user/:userId
 *
 * Retrieves all generations for a user
 */
router.get('/generations/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // 1. Fetch user generations
    const supabase = getSupabaseClient();
    const { data, error, count } = await supabase
      .from('generations')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        error: 'Failed to fetch generations',
        details: error.message
      });
    }

    res.json({
      generations: data || [],
      total: count || 0,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    });

  } catch (error: any) {
    console.error('Error fetching user generations:', error);
    res.status(500).json({
      error: 'Failed to fetch generations',
      details: error.message
    });
  }
});

export default router;
