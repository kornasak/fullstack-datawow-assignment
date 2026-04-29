import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { RegisterDto, RegisterResponse } from './dto/register.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import type { RequestUser, RequestWithUser } from '../../common/types/request';

@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ type: RegisterResponse })
  register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponse })
  login(@Body() dto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(dto);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: RequestWithUser): RequestUser {
    return req.user;
  }

  @Get('admin-only')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  adminOnly() {
    return { message: 'ok' };
  }
}
