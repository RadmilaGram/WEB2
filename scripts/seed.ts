import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || '',
);

async function seed() {
  console.log('Starting database seeding...\n');

  const categories = [
    { name: 'Electronics', description: 'Electronic devices and accessories' },
    { name: 'Computers', description: 'Computer hardware and peripherals' },
    { name: 'Office Supplies', description: 'Essential office equipment' },
  ];

  console.log('Creating categories...');
  const { data: createdCategories, error: catError } = await supabase
    .from('categories')
    .insert(categories)
    .select();

  if (catError) {
    console.error('Error creating categories:', catError);
    return;
  }

  console.log(`Created ${createdCategories.length} categories\n`);

  const [electronics, computers, office] = createdCategories;

  const products = [
    {
      name: 'Professional Keyboard',
      description: 'Mechanical keyboard with RGB lighting',
      price: 149.99,
      category_id: computers.id,
    },
    {
      name: 'Ergonomic Mouse',
      description: 'Wireless mouse with precision tracking',
      price: 79.99,
      category_id: computers.id,
    },
    {
      name: 'HD Webcam Pro',
      description: '4K webcam for video conferencing',
      price: 199.99,
      category_id: electronics.id,
    },
    {
      name: 'USB-C Hub',
      description: '7-in-1 connectivity hub',
      price: 49.99,
      category_id: electronics.id,
    },
    {
      name: 'Laptop Stand Pro',
      description: 'Aluminum adjustable laptop stand',
      price: 59.99,
      category_id: office.id,
    },
    {
      name: 'Blue Light Glasses',
      description: 'Computer glasses with blue light filter',
      price: 29.99,
      category_id: office.id,
    },
    {
      name: 'Desk Mat XL',
      description: 'Extra large premium desk mat',
      price: 24.99,
      category_id: office.id,
    },
    {
      name: 'Monitor Light Bar',
      description: 'Screen-mounted LED light bar',
      price: 89.99,
      category_id: electronics.id,
    },
    {
      name: 'Wireless Headphones',
      description: 'Noise-canceling Bluetooth headphones',
      price: 249.99,
      category_id: electronics.id,
    },
    {
      name: 'Portable SSD',
      description: '1TB external solid state drive',
      price: 129.99,
      category_id: computers.id,
    },
  ];

  console.log('Creating products...');
  const { data: createdProducts, error: prodError } = await supabase
    .from('products')
    .insert(products)
    .select();

  if (prodError) {
    console.error('Error creating products:', prodError);
    return;
  }

  console.log(`Created ${createdProducts.length} products\n`);
  console.log('Database seeding completed successfully!');
}

seed().catch(console.error);
