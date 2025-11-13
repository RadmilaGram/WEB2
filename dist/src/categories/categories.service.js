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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let CategoriesService = class CategoriesService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async create(createCategoryDto) {
        const { data, error } = await this.supabase
            .getClient()
            .from('categories')
            .insert([createCategoryDto])
            .select()
            .single();
        if (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Category with this name already exists');
            }
            throw error;
        }
        return data;
    }
    async findAll() {
        const { data, error } = await this.supabase
            .getClient()
            .from('categories')
            .select('*')
            .order('name');
        if (error)
            throw error;
        return data || [];
    }
    async findOne(id) {
        const { data, error } = await this.supabase
            .getClient()
            .from('categories')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (error)
            throw error;
        if (!data) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return data;
    }
    async update(id, updateCategoryDto) {
        const { data, error } = await this.supabase
            .getClient()
            .from('categories')
            .update({ ...updateCategoryDto, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            if (error.code === 'PGRST116') {
                throw new common_1.NotFoundException(`Category with ID ${id} not found`);
            }
            if (error.code === '23505') {
                throw new common_1.ConflictException('Category with this name already exists');
            }
            throw error;
        }
        return data;
    }
    async remove(id) {
        const { error } = await this.supabase
            .getClient()
            .from('categories')
            .delete()
            .eq('id', id);
        if (error)
            throw error;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map