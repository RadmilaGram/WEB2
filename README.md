# Production-Grade NestJS API

A professionally structured NestJS API with validation, versioning, pagination, health checks, and aggregated statistics.

## Features

- **Global Validation**: Input validation with `class-validator` (whitelist, transform)
- **API Versioning**: URL-based versioning (`/api/v1/...`)
- **Swagger Documentation**: Interactive API docs at `/docs`
- **Pagination & Search**: Efficient product listing with query parameters
- **Health Check**: Service monitoring endpoint at `/api/health`
- **Statistics**: Aggregated product analytics at `/api/stats/products`
- **Error Handling**: Proper validation errors and 404 responses

## Quick Start

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

The server starts on `http://localhost:3000`

## API Endpoints

### Products (v1)

- `GET /api/v1/products` - List products with pagination and search
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create new product
- `PATCH /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Health

- `GET /api/health` - Health check (status, uptime, timestamp)

### Stats (v1)

- `GET /api/v1/stats/products` - Product statistics (count, total, avgPrice)

### Documentation

- `GET /docs` - Swagger UI

## How to Test

### List products with pagination and search
```bash
curl "http://localhost:3000/api/v1/products?q=pro&page=1&limit=5"
```

Expected response:
```json
{
  "items": [
    {
      "id": "1",
      "name": "Professional Keyboard",
      "description": "Mechanical keyboard with RGB lighting",
      "price": 149.99,
      "createdAt": "2025-11-12T10:30:00.000Z",
      "updatedAt": "2025-11-12T10:30:00.000Z"
    }
  ],
  "page": 1,
  "limit": 5,
  "total": 2
}
```

### Health check
```bash
curl "http://localhost:3000/api/health"
```

Expected response:
```json
{
  "status": "ok",
  "uptimeSec": 3600.5,
  "timestamp": "2025-11-12T10:30:00.000Z"
}
```

### Product statistics
```bash
curl "http://localhost:3000/api/stats/products"
```

Expected response:
```json
{
  "count": 8,
  "total": 684.92,
  "avgPrice": 85.62
}
```

### Create a product
```bash
curl -X POST "http://localhost:3000/api/v1/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Charger",
    "description": "Fast charging pad",
    "price": 39.99
  }'
```

### Validation error example
```bash
curl -X POST "http://localhost:3000/api/v1/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "price": -10
  }'
```

Expected validation error (400):
```json
{
  "statusCode": 400,
  "message": ["price must not be less than 0"],
  "error": "Bad Request"
}
```

## Architecture

```
src/
├── main.ts                    # Entry point with validation, versioning, Swagger
├── app.module.ts              # Root module
├── common/
│   └── dto/
│       └── pagination.dto.ts  # Reusable pagination DTOs
├── products/
│   ├── dto/                   # Product DTOs with validation
│   ├── products.controller.ts # REST endpoints
│   ├── products.service.ts    # Business logic
│   └── products.module.ts
├── health/
│   ├── dto/
│   ├── health.controller.ts   # Health check endpoint
│   └── health.module.ts
└── stats/
    ├── dto/
    ├── stats.controller.ts    # Analytics endpoints
    └── stats.module.ts
```

## Key Implementation Details

- **ValidationPipe**: Configured globally with `whitelist: true` and `transform: true`
- **Versioning**: Default version set to `'1'` for all endpoints
- **Pagination**: Query parameters validated with min/max constraints
- **Search**: Case-insensitive search across name and description fields
- **DTOs**: All DTOs use `@ApiProperty` for Swagger documentation
- **Error Responses**: Consistent JSON error format with proper HTTP status codes

## Development

```bash
# Watch mode for development
npm run start:dev

# Production mode
npm run start:prod
```

## Validation Rules

### Product Creation
- `name`: Required, max 100 characters
- `description`: Optional, max 500 characters
- `price`: Required, minimum 0

### Pagination
- `page`: Optional, minimum 1 (default: 1)
- `limit`: Optional, 1-100 (default: 10)
- `q`: Optional search string
