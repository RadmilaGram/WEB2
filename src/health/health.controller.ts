import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthResponseDto } from './dto/health-response.dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint for monitoring and uptime verification' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy and operational',
    type: HealthResponseDto,
    schema: {
      example: {
        status: 'ok',
        uptimeSec: 3600.5,
        timestamp: '2025-11-12T10:30:00.000Z',
      },
    },
  })
  check(): HealthResponseDto {
    return {
      status: 'ok',
      uptimeSec: Number(process.uptime().toFixed(2)),
      timestamp: new Date().toISOString(),
    };
  }
}
