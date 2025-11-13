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
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../products/products.service");
const categories_service_1 = require("../categories/categories.service");
let CatalogController = class CatalogController {
    constructor(productsService, categoriesService) {
        this.productsService = productsService;
        this.categoriesService = categoriesService;
    }
    async getCatalog(page = '1', limit = '12', search, categoryId) {
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 12;
        const [productsData, categories] = await Promise.all([
            this.productsService.findAll(pageNum, limitNum, search, categoryId),
            this.categoriesService.findAll(),
        ]);
        const totalPages = Math.ceil(productsData.total / limitNum);
        return {
            products: productsData.items,
            categories,
            pagination: {
                currentPage: pageNum,
                totalPages,
                hasNext: pageNum < totalPages,
                hasPrev: pageNum > 1,
            },
            filters: {
                search: search || '',
                categoryId: categoryId || '',
            },
            title: 'Product Catalog',
        };
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('catalog'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('q')),
    __param(3, (0, common_1.Query)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getCatalog", null);
exports.CatalogController = CatalogController = __decorate([
    (0, common_1.Controller)('catalog'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        categories_service_1.CategoriesService])
], CatalogController);
//# sourceMappingURL=catalog.controller.js.map