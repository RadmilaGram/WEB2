import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from '../products/products.service';
import { ProductStatsResponseDto } from './dto/product-stats-response.dto';

@ApiTags('stats')
@Controller({ path: 'stats', version: '1' })
export class StatsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  @ApiOperation({ summary: 'Get aggregated statistics for all products' })
  @ApiResponse({
    status: 200,
    description: 'Product statistics including count, total value, and average price',
    type: ProductStatsResponseDto,
    schema: {
      example: {
        count: 8,
        total: 684.92,
        avgPrice: 85.62,
      },
    },
  })
  getProductStats(): ProductStatsResponseDto {
    return this.productsService.getStats();
  }
}
