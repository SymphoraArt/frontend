-- Migration: Add spendable balance to users
-- Date: 2026-06-05
-- Description: Adds a single `balance` (USD) column to turnkey_users, credited
--              by fiat top-ups (Stripe / PayPal). Idempotency for payments is
--              handled via Stripe PaymentIntent metadata, so no ledger table is
--              needed.

ALTER TABLE turnkey_users
    ADD COLUMN IF NOT EXISTS balance NUMERIC(14, 2) NOT NULL DEFAULT 0;
