import { ApiProperty } from '@nestjs/swagger';

export class ProductStatsResponseDto {
  @ApiProperty({
    description: 'Total number of products',
    example: 8,
  })
  count: number;

  @ApiProperty({
    description: 'Sum of all product prices',
    example: 684.92,
  })
  total: number;

  @ApiProperty({
    description: 'Average price across all products',
    example: 85.62,
  })
  avgPrice: number;
}
