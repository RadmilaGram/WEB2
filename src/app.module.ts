import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { HealthModule } from './health/health.module';
import { StatsModule } from './stats/stats.module';
import { CatalogModule } from './catalog/catalog.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    SupabaseModule,
    ProductsModule,
    CategoriesModule,
    HealthModule,
    StatsModule,
    CatalogModule,
  ],
})
export class AppModule {}
