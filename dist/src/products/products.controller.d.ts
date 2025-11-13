import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginationQueryDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        message: string;
        imageUrl: string;
    }>;
    findAll(query: PaginationQueryDto, categoryId?: string): Promise<PaginatedResponseDto<ProductResponseDto>>;
    findOne(id: string): Promise<ProductResponseDto>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto>;
    remove(id: string): Promise<void>;
}
