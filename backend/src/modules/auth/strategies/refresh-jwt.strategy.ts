import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.refreshToken;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        // Verify session exists and is valid
        const session = await this.prisma.authSession.findFirst({
            where: {
                userId: payload.sub,
                refreshToken,
                isRevoked: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        userId: true,
                        isActive: true,
                        isDeleted: true,
                    },
                },
            },
        });

        if (!session || !session.user.isActive || session.user.isDeleted) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        return {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            userId: session.user.userId,
            sessionId: session.id,
        };
    }
}
