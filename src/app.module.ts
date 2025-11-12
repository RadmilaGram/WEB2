import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { HealthModule } from './health/health.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [ProductsModule, HealthModule, StatsModule],
})
export class AppModule {}
