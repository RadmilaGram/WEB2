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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let ProductsService = class ProductsService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async create(createProductDto) {
        const { data, error } = await this.supabase
            .getClient()
            .from('products')
            .insert([createProductDto])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async findAll(page = 1, limit = 10, search, categoryId) {
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
        if (error)
            throw error;
        return {
            items: data || [],
            page,
            limit,
            total: count || 0,
        };
    }
    async findOne(id) {
        const { data, error } = await this.supabase
            .getClient()
            .from('products')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (error)
            throw error;
        if (!data) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return data;
    }
    async update(id, updateProductDto) {
        const { data, error } = await this.supabase
            .getClient()
            .from('products')
            .update({ ...updateProductDto, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            if (error.code === 'PGRST116') {
                throw new common_1.NotFoundException(`Product with ID ${id} not found`);
            }
            throw error;
        }
        return data;
    }
    async remove(id) {
        const { error } = await this.supabase.getClient().from('products').delete().eq('id', id);
        if (error)
            throw error;
    }
    async getStats() {
        const { data, error } = await this.supabase
            .getClient()
            .from('products')
            .select('price');
        if (error)
            throw error;
        const count = data?.length || 0;
        const total = data?.reduce((sum, p) => sum + Number(p.price), 0) || 0;
        const avgPrice = count > 0 ? total / count : 0;
        return {
            count,
            total: Number(total.toFixed(2)),
            avgPrice: Number(avgPrice.toFixed(2)),
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ProductsService);
//# sourceMappingURL=products.service.js.map