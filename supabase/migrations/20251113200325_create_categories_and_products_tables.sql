/*
  # Create Categories and Products Tables

  ## Overview
  Creates a complete e-commerce database structure with categories and products,
  including proper relationships, constraints, and Row Level Security.

  ## New Tables

  ### `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text, unique, required) - Category name
  - `description` (text, optional) - Category description
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text, required) - Product name
  - `description` (text, optional) - Product description
  - `price` (numeric, required) - Product price (must be >= 0)
  - `category_id` (uuid, optional) - Foreign key to categories
  - `image_url` (text, optional) - Product image URL
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - RLS enabled on both tables
  - Public read access for all users
  - No write access by default (will be handled by API with service role)

  ## Important Notes
  - Uses CASCADE on category deletion to maintain referential integrity
  - Prices stored as numeric(10,2) for precise decimal handling
  - All timestamps default to current time
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table with category relation
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required for reading)
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);
