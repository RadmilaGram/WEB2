import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Product unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Professional Keyboard',
  })
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'High-quality mechanical keyboard with RGB lighting',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Product price in USD',
    example: 149.99,
  })
  price: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-11-12T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-11-12T10:30:00.000Z',
  })
  updatedAt: Date;
}
