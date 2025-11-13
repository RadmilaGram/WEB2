import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const { data, error } = await this.supabase
      .getClient()
      .from('categories')
      .insert([createCategoryDto])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new ConflictException('Category with this name already exists');
      }
      throw error;
    }

    return data;
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;

    return data || [];
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const { data, error } = await this.supabase
      .getClient()
      .from('categories')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return data;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    const { data, error } = await this.supabase
      .getClient()
      .from('categories')
      .update({ ...updateCategoryDto, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      if (error.code === '23505') {
        throw new ConflictException('Category with this name already exists');
      }
      throw error;
    }

    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase
      .getClient()
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
