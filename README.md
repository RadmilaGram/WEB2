# Production-Grade NestJS API with SSR Catalog

A professionally structured NestJS API with database persistence, validation, versioning, pagination, SSR catalog page, image uploads, and API key protection.

## Features

- **Supabase Database**: PostgreSQL database with Row Level Security
- **Categories Module**: Product categorization with full CRUD operations
- **SSR Catalog Page**: Server-side rendered product catalog with Handlebars
- **API Key Protection**: x-api-key header required for write operations
- **Image Uploads**: Product image upload with Multer and static file serving
- **Global Validation**: Input validation with `class-validator`
- **API Versioning**: URL-based versioning (`/api/v1/...`)
- **Swagger Documentation**: Interactive API docs at `/docs`
- **Pagination & Search**: Efficient product listing with query parameters
- **Category Filtering**: Filter products by category
- **Health Check**: Service monitoring endpoint
- **Statistics**: Aggregated product analytics

## Quick Start

```bash
# Install dependencies
npm install

# Seed the database with sample data
npm run seed

# Build the project
npm run build

# Start the server
npm start
```

The server starts on `http://localhost:3000`

## API Endpoints

### SSR Catalog Page

- `GET /catalog` - Server-side rendered product catalog with search, category filtering, and pagination
  - Query params: `?page=1&limit=12&q=search&category_id=uuid`

### Products (v1) - Protected with x-api-key

- `GET /api/v1/products` - List products with pagination, search, and category filter
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create new product (requires x-api-key)
- `POST /api/v1/products/upload/:id` - Upload product image (requires x-api-key)
- `PATCH /api/v1/products/:id` - Update product (requires x-api-key)
- `DELETE /api/v1/products/:id` - Delete product (requires x-api-key)

### Categories (v1) - Protected with x-api-key

- `GET /api/v1/categories` - List all categories
- `GET /api/v1/categories/:id` - Get category by ID
- `POST /api/v1/categories` - Create new category (requires x-api-key)
- `PATCH /api/v1/categories/:id` - Update category (requires x-api-key)
- `DELETE /api/v1/categories/:id` - Delete category (requires x-api-key)

### Health

- `GET /api/health` - Health check (status, uptime, timestamp)

### Stats (v1)

- `GET /api/v1/stats/products` - Product statistics (count, total, avgPrice)

### Documentation

- `GET /docs` - Swagger UI

## How to Test

### Visit SSR Catalog Page
Open in browser: `http://localhost:3000/catalog`

Features:
- Search products by name or description
- Filter by category
- Pagination controls
- Responsive design with gradient background

### List products with pagination, search, and category filter
```bash
curl "http://localhost:3000/api/v1/products?q=keyboard&page=1&limit=5&category_id=uuid"
```

### Create a category (requires API key)
```bash
curl -X POST "http://localhost:3000/api/v1/categories" \
  -H "Content-Type: application/json" \
  -H "x-api-key: secure-api-key-12345" \
  -d '{
    "name": "Accessories",
    "description": "Computer accessories"
  }'
```

### Create a product (requires API key)
```bash
curl -X POST "http://localhost:3000/api/v1/products" \
  -H "Content-Type: application/json" \
  -H "x-api-key: secure-api-key-12345" \
  -d '{
    "name": "Wireless Charger",
    "description": "Fast charging pad",
    "price": 39.99,
    "category_id": "uuid-of-category"
  }'
```

### Upload product image (requires API key)
```bash
curl -X POST "http://localhost:3000/api/v1/products/upload/{product-id}" \
  -H "x-api-key: secure-api-key-12345" \
  -F "image=@/path/to/image.jpg"
```

### Missing API key error
```bash
curl -X POST "http://localhost:3000/api/v1/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 99.99
  }'
```

Expected error (401):
```json
{
  "statusCode": 401,
  "message": "Invalid or missing API key",
  "error": "Unauthorized"
}
```

### Health check
```bash
curl "http://localhost:3000/api/health"
```

### Product statistics
```bash
curl "http://localhost:3000/api/v1/stats/products"
```

## Architecture

```
src/
├── main.ts                      # Entry point with SSR, validation, versioning
├── app.module.ts                # Root module
├── common/
│   ├── dto/
│   │   └── pagination.dto.ts    # Reusable pagination DTOs
│   └── guards/
│       └── api-key.guard.ts     # API key authentication guard
├── supabase/
│   ├── supabase.service.ts      # Supabase client service
│   └── supabase.module.ts       # Global Supabase module
├── products/
│   ├── dto/                     # Product DTOs with validation
│   ├── products.controller.ts   # REST endpoints + image upload
│   ├── products.service.ts      # Business logic with Supabase
│   └── products.module.ts
├── categories/
│   ├── dto/                     # Category DTOs with validation
│   ├── categories.controller.ts # REST endpoints
│   ├── categories.service.ts    # Business logic with Supabase
│   └── categories.module.ts
├── catalog/
│   ├── catalog.controller.ts    # SSR controller
│   └── catalog.module.ts
├── health/
│   ├── dto/
│   ├── health.controller.ts     # Health check endpoint
│   └── health.module.ts
└── stats/
    ├── dto/
    ├── stats.controller.ts      # Analytics endpoints
    └── stats.module.ts

views/
└── catalog.hbs                  # Handlebars template for catalog

public/
└── css/
    └── catalog.css              # Catalog page styling

uploads/
└── products/                    # Product image storage
```

## Key Implementation Details

- **Database**: Supabase PostgreSQL with Row Level Security policies
- **Authentication**: x-api-key header guard for write operations (POST, PUT, PATCH, DELETE)
- **SSR**: Handlebars view engine for server-side rendered catalog page
- **Image Upload**: Multer with disk storage, 5MB limit, image validation
- **Static Files**: Serves /public and /uploads directories
- **ValidationPipe**: Configured globally with whitelist and transform
- **Versioning**: URL-based versioning for API endpoints
- **Pagination**: Query parameters with validation constraints
- **Search**: Case-insensitive search using Supabase ilike queries
- **Category Filtering**: Filter products by category_id
- **Error Handling**: Proper validation errors, 404s, and 401s

## Environment Variables

Required in `.env` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
API_KEY=secure-api-key-12345
PORT=3000
```

## Development

```bash
# Watch mode for development
npm run start:dev

# Production mode
npm run start:prod

# Seed database with sample data
npm run seed
```

## Validation Rules

### Product Creation/Update
- `name`: Required, max 100 characters
- `description`: Optional, max 500 characters
- `price`: Required, minimum 0
- `category_id`: Optional, valid UUID
- `image_url`: Optional, string

### Category Creation/Update
- `name`: Required, max 100 characters, unique
- `description`: Optional, max 500 characters

### Pagination
- `page`: Optional, minimum 1 (default: 1)
- `limit`: Optional, 1-100 (default: 10)
- `q`: Optional search string
- `category_id`: Optional category UUID filter

### Image Upload
- File size: Maximum 5MB
- Allowed formats: JPG, JPEG, PNG, GIF, WEBP
- Storage: Local disk at `./uploads/products`
