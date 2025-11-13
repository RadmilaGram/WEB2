import { Controller, Get, Query, Render } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';

@Controller('catalog')
export class CatalogController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  @Render('catalog')
  async getCatalog(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '12',
    @Query('q') search?: string,
    @Query('category_id') categoryId?: string,
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 12;

    const [productsData, categories] = await Promise.all([
      this.productsService.findAll(pageNum, limitNum, search, categoryId),
      this.categoriesService.findAll(),
    ]);

    const totalPages = Math.ceil(productsData.total / limitNum);

    return {
      products: productsData.items,
      categories,
      pagination: {
        currentPage: pageNum,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
      },
      filters: {
        search: search || '',
        categoryId: categoryId || '',
      },
      title: 'Product Catalog',
    };
  }
}
