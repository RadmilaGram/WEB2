import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginationQueryDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): ProductResponseDto;
    findAll(query: PaginationQueryDto): PaginatedResponseDto<ProductResponseDto>;
    findOne(id: string): ProductResponseDto;
    update(id: string, updateProductDto: UpdateProductDto): ProductResponseDto;
    remove(id: string): void;
}
