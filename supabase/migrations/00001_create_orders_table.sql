/*
# Create Orders Table for Payment System

## 1. New Tables
- `orders`
  - `id` (uuid, primary key)
  - `user_id` (uuid, nullable, references auth.users)
  - `items` (jsonb, order items with name, price, quantity, image_url)
  - `total_amount` (numeric, total order amount)
  - `currency` (text, currency code like 'inr', 'usd')
  - `status` (order_status enum: pending, completed, cancelled, refunded)
  - `stripe_session_id` (text, unique, Stripe checkout session ID)
  - `stripe_payment_intent_id` (text, Stripe payment intent ID)
  - `customer_email` (text, customer email from Stripe)
  - `customer_name` (text, customer name from Stripe)
  - `completed_at` (timestamptz, payment completion timestamp)
  - `created_at` (timestamptz, default: now())
  - `updated_at` (timestamptz, default: now())

## 2. Security
- Enable RLS on `orders` table
- Users can view their own orders (if logged in)
- Service role (Edge Functions) can manage all orders
- Guest checkout is allowed (user_id can be null)

## 3. Notes
- This table supports both authenticated and guest checkout
- All payment processing is handled through Stripe
- Order status is managed by Edge Functions after payment verification
*/

CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled', 'refunded');

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  items jsonb NOT NULL,
  total_amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'inr',
  status order_status NOT NULL DEFAULT 'pending'::order_status,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  customer_email text,
  customer_name text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage orders"
  ON orders FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');