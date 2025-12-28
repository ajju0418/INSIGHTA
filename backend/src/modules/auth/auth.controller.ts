import {
    Controller,
    Post,
    Get,
    Body,
    Res,
    UseGuards,
    UsePipes,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RefreshJwtAuthGuard } from '../../common/guards/refresh-jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { signupSchema } from './schemas/signup.schema';
import { loginSchema } from './schemas/login.schema';
import { Throttle } from '@nestjs/throttler';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('signup')
    @UsePipes(new ZodValidationPipe(signupSchema))
    @ApiOperation({ summary: 'Create new user account' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: AuthResponseDto })
    @ApiResponse({ status: 409, description: 'Email already registered' })
    async signup(
        @Body() signupDto: SignupDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.authService.signup(signupDto);

        // Set refresh token in httpOnly cookie
        response.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return {
            user: result.user,
            accessToken: result.accessToken,
        };
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ZodValidationPipe(loginSchema))
    @Throttle({ default: { limit: 5, ttl: 900000 } }) // 5 attempts per 15 minutes
    @ApiOperation({ summary: 'Authenticate user' })
    @ApiResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiResponse({ status: 429, description: 'Too many login attempts' })
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.authService.login(loginDto);

        // Set refresh token in httpOnly cookie
        response.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return {
            user: result.user,
            accessToken: result.accessToken,
        };
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @UseGuards(RefreshJwtAuthGuard)
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
    @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
    async refresh(
        @CurrentUser() user: any,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.authService.refreshTokens(user.id, user.sessionId);

        // Update refresh token cookie
        response.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return {
            accessToken: result.accessToken,
        };
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'End user session' })
    @ApiResponse({ status: 200, description: 'Logged out successfully' })
    async logout(
        @CurrentUser('id') userId: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.authService.logout(userId);

        // Clear refresh token cookie
        response.clearCookie('refreshToken');

        return { message: 'Logged out successfully' };
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'User profile retrieved' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getCurrentUser(@CurrentUser('id') userId: string) {
        return this.authService.getCurrentUser(userId);
    }
}
