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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const category_response_dto_1 = require("./dto/category-response.dto");
const api_key_guard_1 = require("../common/guards/api-key.guard");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async create(createCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }
    async findAll() {
        return this.categoriesService.findAll();
    }
    async findOne(id) {
        return this.categoriesService.findOne(id);
    }
    async update(id, updateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }
    async remove(id) {
        return this.categoriesService.remove(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new category' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Category successfully created',
        type: category_response_dto_1.CategoryResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or missing API key' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Category with this name already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all categories',
        type: [category_response_dto_1.CategoryResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a category by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Category found',
        type: category_response_dto_1.CategoryResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a category' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Category successfully updated',
        type: category_response_dto_1.CategoryResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or missing API key' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Category with this name already exists' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a category' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Category successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or missing API key' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, swagger_1.ApiSecurity)('api-key'),
    (0, common_1.Controller)({ path: 'categories', version: '1' }),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map