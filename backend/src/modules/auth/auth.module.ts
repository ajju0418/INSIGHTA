import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({}), // Configuration done in strategies
        ConfigModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        RefreshJwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard, // Apply JWT guard globally
        },
    ],
    exports: [AuthService],
})
export class AuthModule { }
