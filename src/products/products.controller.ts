import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiSecurity, ApiConsumes } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginationQueryDto, PaginatedResponseDto } from '../common/dto/pagination.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('products')
@ApiSecurity('api-key')
@Controller({ path: 'products', version: '1' })
@UseGuards(ApiKeyGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Invalid or missing API key' })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    return this.productsService.create(createProductDto);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload product image' })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file or file too large' })
  @ApiResponse({ status: 401, description: 'Invalid or missing API key' })
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const imageUrl = `/uploads/products/${file.filename}`;
    await this.productsService.update(id, { image_url: imageUrl });
    return { message: 'Image uploaded successfully', imageUrl };
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination, search, and category filter' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page', example: 10 })
  @ApiQuery({ name: 'q', required: false, description: 'Search query', example: 'pro' })
  @ApiQuery({ name: 'category_id', required: false, description: 'Filter by category ID' })
  @ApiResponse({
    status: 200,
    description: 'List of products with pagination metadata',
  })
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('category_id') categoryId?: string,
  ): Promise<PaginatedResponseDto<ProductResponseDto>> {
    return this.productsService.findAll(query.page, query.limit, query.q, categoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'Product successfully updated',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Invalid or missing API key' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Invalid or missing API key' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
