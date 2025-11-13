"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Production-Grade API')
        .setDescription('NestJS API with validation, versioning, pagination, and observability')
        .setVersion('1.0')
        .addTag('products', 'Product CRUD operations with pagination and search')
        .addTag('health', 'Health check and system status')
        .addTag('stats', 'Aggregated statistics and analytics')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`\n🚀 Application is running on: http://localhost:${port}`);
    console.log(`📚 Swagger documentation: http://localhost:${port}/docs`);
    console.log(`💚 Health check: http://localhost:${port}/api/health`);
    console.log(`📊 Stats endpoint: http://localhost:${port}/api/stats/products\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map