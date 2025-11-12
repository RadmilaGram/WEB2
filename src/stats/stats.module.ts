import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [StatsController],
})
export class StatsModule {}
