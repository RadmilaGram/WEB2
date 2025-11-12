import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginatedResponseDto } from '../common/dto/pagination.dto';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private idCounter = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    const sampleProducts = [
      { name: 'Professional Keyboard', description: 'Mechanical keyboard with RGB lighting', price: 149.99 },
      { name: 'Ergonomic Mouse', description: 'Wireless mouse with precision tracking', price: 79.99 },
      { name: 'HD Webcam Pro', description: '4K webcam for video conferencing', price: 199.99 },
      { name: 'USB-C Hub', description: '7-in-1 connectivity hub', price: 49.99 },
      { name: 'Laptop Stand Pro', description: 'Aluminum adjustable laptop stand', price: 59.99 },
      { name: 'Blue Light Glasses', description: 'Computer glasses with blue light filter', price: 29.99 },
      { name: 'Desk Mat XL', description: 'Extra large premium desk mat', price: 24.99 },
      { name: 'Monitor Light Bar', description: 'Screen-mounted LED light bar', price: 89.99 },
    ];

    sampleProducts.forEach((product) => this.create(product));
  }

  create(createProductDto: CreateProductDto): ProductResponseDto {
    const product: Product = {
      id: String(this.idCounter++),
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return product;
  }

  findAll(page: number = 1, limit: number = 10, search?: string): PaginatedResponseDto<ProductResponseDto> {
    let filtered = [...this.products];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          (p.description && p.description.toLowerCase().includes(searchLower)),
      );
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const items = filtered.slice(startIndex, startIndex + limit);

    return {
      items,
      page,
      limit,
      total,
    };
  }

  findOne(id: string): ProductResponseDto {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): ProductResponseDto {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, updateProductDto, { updatedAt: new Date() });
    return product;
  }

  remove(id: string): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.products.splice(index, 1);
  }

  getStats() {
    const count = this.products.length;
    const total = this.products.reduce((sum, p) => sum + p.price, 0);
    const avgPrice = count > 0 ? total / count : 0;

    return {
      count,
      total: Number(total.toFixed(2)),
      avgPrice: Number(avgPrice.toFixed(2)),
    };
  }
}
