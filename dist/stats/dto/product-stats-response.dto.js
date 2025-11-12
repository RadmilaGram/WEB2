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
exports.ProductStatsResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProductStatsResponseDto {
}
exports.ProductStatsResponseDto = ProductStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of products',
        example: 8,
    }),
    __metadata("design:type", Number)
], ProductStatsResponseDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sum of all product prices',
        example: 684.92,
    }),
    __metadata("design:type", Number)
], ProductStatsResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Average price across all products',
        example: 85.62,
    }),
    __metadata("design:type", Number)
], ProductStatsResponseDto.prototype, "avgPrice", void 0);
//# sourceMappingURL=product-stats-response.dto.js.map