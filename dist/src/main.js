"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    const hbs = require('hbs');
    hbs.registerHelper('eq', (a, b) => a === b);
    hbs.registerHelper('add', (a, b) => a + b);
    hbs.registerHelper('subtract', (a, b) => a - b);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api', {
        exclude: ['catalog'],
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`\nApplication is running on: http://localhost:${port}`);
    console.log(`Swagger documentation: http://localhost:${port}/docs`);
    console.log(`SSR Catalog page: http://localhost:${port}/catalog`);
    console.log(`Health check: http://localhost:${port}/api/health`);
    console.log(`Stats endpoint: http://localhost:${port}/api/stats/products\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map