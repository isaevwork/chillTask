import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Проверка работы API' })
  getHello() {
    return {
      message: 'ChillTask API работает! 🚀',
      version: '1.0.0',
      endpoints: {
        auth: {
          register: 'POST /auth/register',
          login: 'POST /auth/login',
          profile: 'GET /auth/profile',
        },
        docs: 'GET /api/docs',
      },
    };
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Защищенный endpoint (требует токен)' })
  getProtected(@Request() req) {
    return {
      message: 'Это защищенный endpoint!',
      user: req.user,
      timestamp: new Date().toISOString(),
    };
  }
}
