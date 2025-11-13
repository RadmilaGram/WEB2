import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [ProductsModule, CategoriesModule],
  controllers: [CatalogController],
})
export class CatalogModule {}
