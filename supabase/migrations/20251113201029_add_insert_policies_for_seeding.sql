/*
  # Add INSERT policies for initial data seeding

  ## Overview
  Adds INSERT policies to allow initial data population for categories and products.
  These policies allow anonymous users to insert data, which is needed for seeding.
  In production, you would typically use service role key or restrict these further.

  ## Security Changes
  - Add INSERT policy for categories (allows anon and authenticated)
  - Add INSERT policy for products (allows anon and authenticated)
  - Add UPDATE policy for products (allows anon and authenticated)
  - Add DELETE policy for categories (allows anon and authenticated)
  - Add DELETE policy for products (allows anon and authenticated)

  ## Important Notes
  - These policies are permissive for development purposes
  - In production, you should restrict these to service role or specific users
  - The API will handle authentication via x-api-key header
*/

-- INSERT policies for categories
CREATE POLICY "Allow inserts on categories"
  ON categories FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- UPDATE policies for categories
CREATE POLICY "Allow updates on categories"
  ON categories FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE policies for categories
CREATE POLICY "Allow deletes on categories"
  ON categories FOR DELETE
  TO anon, authenticated
  USING (true);

-- INSERT policies for products
CREATE POLICY "Allow inserts on products"
  ON products FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- UPDATE policies for products
CREATE POLICY "Allow updates on products"
  ON products FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- DELETE policies for products
CREATE POLICY "Allow deletes on products"
  ON products FOR DELETE
  TO anon, authenticated
  USING (true);
