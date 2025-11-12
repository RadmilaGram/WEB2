import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe with whitelist and transform
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTO
      transform: true, // Auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Auto-convert primitives
      },
    }),
  );

  // Global API prefix
  app.setGlobalPrefix('api');

  // URL versioning (e.g., /api/v1/products)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Production-Grade API')
    .setDescription('NestJS API with validation, versioning, pagination, and observability')
    .setVersion('1.0')
    .addTag('products', 'Product CRUD operations with pagination and search')
    .addTag('health', 'Health check and system status')
    .addTag('stats', 'Aggregated statistics and analytics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`\n🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/docs`);
  console.log(`💚 Health check: http://localhost:${port}/api/health`);
  console.log(`📊 Stats endpoint: http://localhost:${port}/api/stats/products\n`);
}

bootstrap();
