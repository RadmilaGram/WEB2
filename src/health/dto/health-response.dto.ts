import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    description: 'Service health status',
    example: 'ok',
    enum: ['ok', 'degraded', 'down'],
  })
  status: string;

  @ApiProperty({
    description: 'Server uptime in seconds',
    example: 3600.5,
  })
  uptimeSec: number;

  @ApiProperty({
    description: 'Current server timestamp',
    example: '2025-11-12T10:30:00.000Z',
  })
  timestamp: string;
}
