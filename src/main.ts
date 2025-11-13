import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const hbs = require('hbs');
  hbs.registerHelper('eq', (a, b) => a === b);
  hbs.registerHelper('add', (a, b) => a + b);
  hbs.registerHelper('subtract', (a, b) => a - b);

  // Global validation pipe with whitelist and transform
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global API prefix (excludes catalog route)
  app.setGlobalPrefix('api', {
    exclude: ['catalog'],
  });

  // URL versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Production-Grade API')
    .setDescription('NestJS API with validation, versioning, pagination, SSR catalog, and image uploads')
    .setVersion('1.0')
    .addTag('products', 'Product CRUD operations with pagination and search')
    .addTag('categories', 'Category management')
    .addTag('health', 'Health check and system status')
    .addTag('stats', 'Aggregated statistics and analytics')
    .addSecurity('api-key', {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`\nApplication is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/docs`);
  console.log(`SSR Catalog page: http://localhost:${port}/catalog`);
  console.log(`Health check: http://localhost:${port}/api/health`);
  console.log(`Stats endpoint: http://localhost:${port}/api/stats/products\n`);
}

bootstrap();
