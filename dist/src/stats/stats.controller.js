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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("../products/products.service");
const product_stats_response_dto_1 = require("./dto/product-stats-response.dto");
let StatsController = class StatsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getProductStats() {
        return this.productsService.getStats();
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'Get aggregated statistics for all products' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product statistics including count, total value, and average price',
        type: product_stats_response_dto_1.ProductStatsResponseDto,
        schema: {
            example: {
                count: 8,
                total: 684.92,
                avgPrice: 85.62,
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getProductStats", null);
exports.StatsController = StatsController = __decorate([
    (0, swagger_1.ApiTags)('stats'),
    (0, common_1.Controller)({ path: 'stats', version: '1' }),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], StatsController);
//# sourceMappingURL=stats.controller.js.map