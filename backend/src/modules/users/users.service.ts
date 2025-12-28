import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                userId: true,
                avatar: true,
                timezone: true,
                currency: true,
                dateFormat: true,
                emailVerified: true,
                createdAt: true,
                settings: true,
                onboarding: true,
            },
        });
    }

    async updateProfile(userId: string, data: any) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                avatar: data.avatar,
                timezone: data.timezone,
                currency: data.currency,
                dateFormat: data.dateFormat,
            },
            select: {
                id: true,
                email: true,
                name: true,
                userId: true,
                avatar: true,
                timezone: true,
                currency: true,
                dateFormat: true,
                emailVerified: true,
                createdAt: true,
            },
        });
    }
}
