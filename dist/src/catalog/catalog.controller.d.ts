import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';
export declare class CatalogController {
    private readonly productsService;
    private readonly categoriesService;
    constructor(productsService: ProductsService, categoriesService: CategoriesService);
    getCatalog(page?: string, limit?: string, search?: string, categoryId?: string): Promise<{
        products: import("../products/dto/product-response.dto").ProductResponseDto[];
        categories: import("../categories/dto/category-response.dto").CategoryResponseDto[];
        pagination: {
            currentPage: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        filters: {
            search: string;
            categoryId: string;
        };
        title: string;
    }>;
}
