import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimelineService {
    constructor(private prisma: PrismaService) { }

    async getTimeline(userId: string, date?: string) {
        const targetDate = date ? new Date(date) : new Date();
        targetDate.setHours(0, 0, 0, 0);

        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const events = await this.prisma.timelineEvent.findMany({
            where: {
                userId,
                startTime: {
                    gte: targetDate,
                    lt: nextDay,
                },
            },
            include: {
                habit: {
                    select: {
                        name: true,
                        icon: true,
                        color: true,
                    },
                },
                expense: {
                    select: {
                        amount: true,
                        category: true,
                    },
                },
                goal: {
                    select: {
                        name: true,
                        icon: true,
                        color: true,
                    },
                },
            },
            orderBy: {
                startTime: 'asc',
            },
        });

        return {
            date: targetDate.toISOString().split('T')[0],
            events: events.map(event => ({
                id: event.id,
                time: event.startTime.toTimeString().substring(0, 5), // HH:MM
                event: event.eventName,
                type: event.eventType,
                duration: event.duration,
                color: event.habit?.color || event.goal?.color || this.getColorByType(event.eventType),
                icon: event.habit?.icon || event.goal?.icon || this.getIconByType(event.eventType),
                metadata: event.metadata,
            })),
        };
    }

    private getColorByType(type: string): string {
        const colors: Record<string, string> = {
            HABIT: '#10B981',
            EXPENSE: '#F59E0B',
            GOAL: '#8B5CF6',
            CUSTOM: '#6B7280',
        };
        return colors[type] || '#6B7280';
    }

    private getIconByType(type: string): string {
        const icons: Record<string, string> = {
            HABIT: 'zap',
            EXPENSE: 'dollar-sign',
            GOAL: 'target',
            CUSTOM: 'circle',
        };
        return icons[type] || 'circle';
    }
}
