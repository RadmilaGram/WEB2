import { SupabaseService } from '../supabase/supabase.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginatedResponseDto } from '../common/dto/pagination.dto';
export declare class ProductsService {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    create(createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    findAll(page?: number, limit?: number, search?: string, categoryId?: string): Promise<PaginatedResponseDto<ProductResponseDto>>;
    findOne(id: string): Promise<ProductResponseDto>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto>;
    remove(id: string): Promise<void>;
    getStats(): Promise<{
        count: number;
        total: number;
        avgPrice: number;
    }>;
}
