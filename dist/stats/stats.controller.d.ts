import { ProductsService } from '../products/products.service';
import { ProductStatsResponseDto } from './dto/product-stats-response.dto';
export declare class StatsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProductStats(): ProductStatsResponseDto;
}
