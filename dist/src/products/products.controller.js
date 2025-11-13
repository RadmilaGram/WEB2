"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const product_response_dto_1 = require("./dto/product-response.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const api_key_guard_1 = require("../common/guards/api-key.guard");
const multer_1 = require("multer");
const path_1 = require("path");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    async uploadImage(id, file) {
        const imageUrl = `/uploads/products/${file.filename}`;
        await this.productsService.update(id, { image_url: imageUrl });
        return { message: 'Image uploaded successfully', imageUrl };
    }
    async findAll(query, categoryId) {
        return this.productsService.findAll(query.page, query.limit, query.q, categoryId);
    }
    async findOne(id) {
        return this.productsService.findOne(id);
    }
    async update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    async remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Product successfully created',
        type: product_response_dto_1.ProductResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or missing API key' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/products',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                return cb(new Error('Only image files are allowed'), false);
            }
            cb(null, true);
        },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload product image' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image uploaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file or file too large' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or missing API key' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products with pagination, search, and category filter' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Page number', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Items per page', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false, description: 'Search query', example: 'pro' }),
    (0, swagger_1.ApiQuery)({ name: 'category_id', required: false, description: 'Filter by category ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of products with pagination metadata',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product found',
        type: product_response_dto_1.ProductResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product successfully updated',
        type: product_response_dto_1.ProductResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or missing API key' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Product successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or missing API key' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, swagger_1.ApiSecurity)('api-key'),
    (0, common_1.Controller)({ path: 'products', version: '1' }),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map