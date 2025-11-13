import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'Category unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
  })
  name: string;

  @ApiProperty({
    description: 'Category description',
    example: 'Electronic devices and accessories',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-11-13T10:30:00.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-11-13T10:30:00.000Z',
  })
  updated_at: Date;
}
