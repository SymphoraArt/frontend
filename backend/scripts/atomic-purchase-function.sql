-- Atomic Purchase Recording Function
-- This function atomically records a purchase and updates creator earnings
-- Prevents race conditions and ensures data consistency

CREATE OR REPLACE FUNCTION record_prompt_purchase(
  p_prompt_id TEXT,
  p_buyer_id TEXT,
  p_seller_id TEXT,
  p_amount_cents INTEGER,
  p_platform_fee_cents INTEGER,
  p_creator_earnings_cents INTEGER,
  p_tx_hash TEXT DEFAULT NULL,
  p_chain_id INTEGER DEFAULT NULL,
  p_chain_name TEXT DEFAULT NULL
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
  -- Check for duplicate purchase (idempotency check)
  SELECT id INTO v_existing_purchase_id
  FROM prompt_purchases
  WHERE prompt_id = p_prompt_id
    AND buyer_id = p_buyer_id
    AND status = 'completed'
  LIMIT 1;

  IF v_existing_purchase_id IS NOT NULL THEN
    RETURN QUERY SELECT v_existing_purchase_id, TRUE, 'Purchase already exists'::TEXT;
    RETURN;
  END IF;

  -- Calculate period boundaries for earnings tracking
  v_current_month_start := date_trunc('month', NOW());
  v_current_week_start := date_trunc('week', NOW());

  -- Insert purchase record
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
    completed_at
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
    NOW()
  ) RETURNING id INTO v_purchase_id;

  -- Update creator earnings atomically
  -- This uses INSERT ... ON CONFLICT to handle both new and existing creators
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
  WHEN OTHERS THEN
    -- Return error information
    RETURN QUERY SELECT NULL::UUID, FALSE, SQLERRM::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION record_prompt_purchase TO authenticated;
GRANT EXECUTE ON FUNCTION record_prompt_purchase TO service_role;

-- Add comment
COMMENT ON FUNCTION record_prompt_purchase IS 'Atomically records a prompt purchase and updates creator earnings. Prevents duplicate purchases and ensures data consistency.';