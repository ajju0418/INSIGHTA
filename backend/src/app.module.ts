import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { HabitsModule } from './modules/habits/habits.module';
import { GoalsModule } from './modules/goals/goals.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { TimelineModule } from './modules/timeline/timeline.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Rate limiting
        ThrottlerModule.forRoot([
            {
                ttl: parseInt(process.env.THROTTLE_TTL) || 60,
                limit: parseInt(process.env.THROTTLE_LIMIT) || 100,
            },
        ]),

        // Database
        PrismaModule,

        // Feature modules
        AuthModule,
        UsersModule,
        HealthModule,

        // Phase 2: Business modules
        HabitsModule,
        GoalsModule,
        ExpensesModule,
        TimelineModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule { }
