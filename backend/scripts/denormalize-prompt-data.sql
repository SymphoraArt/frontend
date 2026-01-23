-- Denormalize Prompt Data in Purchases
-- Adds prompt_title and prompt_preview_image_url to prompt_purchases table
-- This eliminates N+1 query problem by storing frequently accessed data

-- =====================================================
-- 1. ADD DENORMALIZED COLUMNS
-- =====================================================

ALTER TABLE prompt_purchases
ADD COLUMN IF NOT EXISTS prompt_title TEXT,
ADD COLUMN IF NOT EXISTS prompt_preview_image_url TEXT;

-- Add comment
COMMENT ON COLUMN prompt_purchases.prompt_title IS 
'Denormalized prompt title to avoid N+1 queries. Updated at purchase time.';

COMMENT ON COLUMN prompt_purchases.prompt_preview_image_url IS 
'Denormalized prompt preview image URL to avoid N+1 queries. Updated at purchase time.';

-- =====================================================
-- 2. UPDATE ATOMIC PURCHASE FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION record_prompt_purchase(
  p_prompt_id TEXT,
  p_buyer_id TEXT,
  p_seller_id TEXT,
  p_amount_cents INTEGER,
  p_platform_fee_cents INTEGER,
  p_creator_earnings_cents INTEGER,
  p_tx_hash TEXT DEFAULT NULL,
  p_chain_id INTEGER DEFAULT NULL,
  p_chain_name TEXT DEFAULT NULL,
  p_prompt_title TEXT DEFAULT NULL,
  p_prompt_preview_image_url TEXT DEFAULT NULL
) RETURNS TABLE(
  purchase_id UUID,
  earnings_updated BOOLEAN,
  error_message TEXT
) AS $$
DECLARE
  v_purchase_id UUID;
  v_existing_purchase_id UUID;
  v_current_month_start TIMESTAMP;
  v_current_week_start TIMESTAMP;
BEGIN
  -- Calculate period boundaries for earnings tracking
  v_current_month_start := date_trunc('month', NOW());
  v_current_week_start := date_trunc('week', NOW());

  -- Check for existing purchase first (optimistic check)
  SELECT id INTO v_existing_purchase_id
  FROM prompt_purchases
  WHERE prompt_id = p_prompt_id
    AND buyer_id = p_buyer_id
    AND status = 'completed'
  LIMIT 1;

  -- If purchase already exists, return it immediately
  IF v_existing_purchase_id IS NOT NULL THEN
    RETURN QUERY SELECT v_existing_purchase_id, TRUE, 'Purchase already exists'::TEXT;
    RETURN;
  END IF;

  -- Insert purchase record with denormalized data
  -- The unique constraint will prevent duplicates even if two requests arrive simultaneously
  INSERT INTO prompt_purchases (
    prompt_id,
    buyer_id,
    seller_id,
    amount_usd_cents,
    platform_fee_cents,
    creator_earnings_cents,
    transaction_hash,
    chain_id,
    chain_name,
    status,
    completed_at,
    prompt_title,
    prompt_preview_image_url
  ) VALUES (
    p_prompt_id,
    p_buyer_id,
    p_seller_id,
    p_amount_cents,
    p_platform_fee_cents,
    p_creator_earnings_cents,
    p_tx_hash,
    p_chain_id,
    p_chain_name,
    'completed',
    NOW(),
    p_prompt_title,
    p_prompt_preview_image_url
  ) RETURNING id INTO v_purchase_id;

  -- New purchase - update creator earnings atomically
  INSERT INTO user_earnings (
    user_id,
    total_earnings_cents,
    total_sales,
    available_earnings_cents,
    earnings_this_month_cents,
    earnings_this_week_cents,
    sales_this_month,
    last_sale_at,
    updated_at
  ) VALUES (
    p_seller_id,
    p_creator_earnings_cents,
    1,
    p_creator_earnings_cents,
    CASE 
      WHEN NOW() >= v_current_month_start THEN p_creator_earnings_cents 
      ELSE 0 
    END,
    CASE 
      WHEN NOW() >= v_current_week_start THEN p_creator_earnings_cents 
      ELSE 0 
    END,
    CASE 
      WHEN NOW() >= v_current_month_start THEN 1 
      ELSE 0 
    END,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_earnings_cents = user_earnings.total_earnings_cents + p_creator_earnings_cents,
    total_sales = user_earnings.total_sales + 1,
    available_earnings_cents = user_earnings.available_earnings_cents + p_creator_earnings_cents,
    earnings_this_month_cents = CASE 
      WHEN NOW() >= v_current_month_start 
      THEN user_earnings.earnings_this_month_cents + p_creator_earnings_cents
      ELSE user_earnings.earnings_this_month_cents
    END,
    earnings_this_week_cents = CASE 
      WHEN NOW() >= v_current_week_start 
      THEN user_earnings.earnings_this_week_cents + p_creator_earnings_cents
      ELSE user_earnings.earnings_this_week_cents
    END,
    sales_this_month = CASE 
      WHEN NOW() >= v_current_month_start 
      THEN user_earnings.sales_this_month + 1
      ELSE user_earnings.sales_this_month
    END,
    last_sale_at = NOW(),
    updated_at = NOW();

  -- Return success
  RETURN QUERY SELECT v_purchase_id, TRUE, NULL::TEXT;

EXCEPTION
  WHEN unique_violation THEN
    -- Unique constraint violation - purchase already exists
    -- Get the existing purchase ID
    SELECT id INTO v_existing_purchase_id
    FROM prompt_purchases
    WHERE prompt_id = p_prompt_id
      AND buyer_id = p_buyer_id
      AND status = 'completed'
    LIMIT 1;

    IF v_existing_purchase_id IS NOT NULL THEN
      RETURN QUERY SELECT v_existing_purchase_id, TRUE, 'Purchase already exists'::TEXT;
    ELSE
      RETURN QUERY SELECT NULL::UUID, FALSE, 'Unique constraint violation but purchase not found'::TEXT;
    END IF;
  WHEN OTHERS THEN
    -- Return error information
    RETURN QUERY SELECT NULL::UUID, FALSE, SQLERRM::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION record_prompt_purchase TO authenticated;
GRANT EXECUTE ON FUNCTION record_prompt_purchase TO service_role;

-- Update comment
COMMENT ON FUNCTION record_prompt_purchase IS 
'Atomically records a prompt purchase and updates creator earnings. Includes denormalized prompt data to prevent N+1 queries.';

-- =====================================================
-- 3. BACKFILL EXISTING DATA (Optional)
-- =====================================================

-- Note: This would require fetching from MongoDB and updating
-- For now, we'll leave existing records without denormalized data
-- New purchases will have the data, old ones can be backfilled later

-- Example backfill query (would need to be run with data from MongoDB):
-- UPDATE prompt_purchases
-- SET prompt_title = '...', prompt_preview_image_url = '...'
-- WHERE prompt_id = '...' AND prompt_title IS NULL;