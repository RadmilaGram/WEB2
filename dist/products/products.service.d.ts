import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginatedResponseDto } from '../common/dto/pagination.dto';
export declare class ProductsService {
    private products;
    private idCounter;
    constructor();
    private seedData;
    create(createProductDto: CreateProductDto): ProductResponseDto;
    findAll(page?: number, limit?: number, search?: string): PaginatedResponseDto<ProductResponseDto>;
    findOne(id: string): ProductResponseDto;
    update(id: string, updateProductDto: UpdateProductDto): ProductResponseDto;
    remove(id: string): void;
    getStats(): {
        count: number;
        total: number;
        avgPrice: number;
    };
}
