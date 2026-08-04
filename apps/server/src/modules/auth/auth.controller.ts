import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Authentication & User Onboarding')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account and initialize organization' })
  async register(@Body() body: { email: string; password: string; fullName: string }) {
    return this.authService.register(body.email, body.password, body.fullName);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('google')
  @ApiOperation({ summary: 'Login / Onboard via Google OAuth2' })
  async googleLogin(@Body() body: { token: string; profile: { email: string; name: string; avatarUrl?: string } }) {
    return this.authService.loginWithGoogle(body.token, body.profile);
  }

  @Post('magic-link')
  @ApiOperation({ summary: 'Request passwordless email magic link' })
  async sendMagicLink(@Body() body: { email: string }) {
    return this.authService.sendMagicLink(body.email);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile and organization details' })
  async getProfile(@Headers('authorization') authHeader?: string) {
    const userId = 'usr-demo-admin-01';
    return this.authService.getProfile(userId);
  }
}
