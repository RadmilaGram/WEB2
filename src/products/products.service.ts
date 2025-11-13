import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const { data, error } = await this.supabase
      .getClient()
      .from('products')
      .insert([createProductDto])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    categoryId?: string,
  ): Promise<PaginatedResponseDto<ProductResponseDto>> {
    let query = this.supabase.getClient().from('products').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const startIndex = (page - 1) * limit;
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(startIndex, startIndex + limit - 1);

    if (error) throw error;

    return {
      items: data || [],
      page,
      limit,
      total: count || 0,
    };
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const { data, error } = await this.supabase
      .getClient()
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return data;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const { data, error } = await this.supabase
      .getClient()
      .from('products')
      .update({ ...updateProductDto, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }

    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.getClient().from('products').delete().eq('id', id);

    if (error) throw error;
  }

  async getStats() {
    const { data, error } = await this.supabase
      .getClient()
      .from('products')
      .select('price');

    if (error) throw error;

    const count = data?.length || 0;
    const total = data?.reduce((sum, p) => sum + Number(p.price), 0) || 0;
    const avgPrice = count > 0 ? total / count : 0;

    return {
      count,
      total: Number(total.toFixed(2)),
      avgPrice: Number(avgPrice.toFixed(2)),
    };
  }
}
