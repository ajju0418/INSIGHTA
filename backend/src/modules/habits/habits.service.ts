import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHabitDto, UpdateHabitDto, CompleteHabitDto } from './schemas/habit.schema';

@Injectable()
export class HabitsService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string, activeOnly: boolean = true) {
        return this.prisma.habit.findMany({
            where: {
                userId,
                isDeleted: false,
                ...(activeOnly && { isActive: true }),
            },
            orderBy: [
                { streak: 'desc' },
                { createdAt: 'desc' },
            ],
        });
    }

    async findOne(id: string, userId: string) {
        const habit = await this.prisma.habit.findFirst({
            where: {
                id,
                userId,
                isDeleted: false,
            },
            include: {
                completions: {
                    orderBy: { completedAt: 'desc' },
                    take: 10,
                },
            },
        });

        if (!habit) {
            throw new NotFoundException('Habit not found');
        }

        return habit;
    }

    async create(userId: string, createHabitDto: CreateHabitDto) {
        return this.prisma.habit.create({
            data: {
                userId,
                name: createHabitDto.name,
                icon: createHabitDto.icon,
                color: createHabitDto.color,
                targetTime: createHabitDto.targetTime,
                reminderEnabled: createHabitDto.reminderEnabled ?? false,
            },
        });
    }

    async update(id: string, userId: string, updateHabitDto: UpdateHabitDto) {
        // Verify ownership
        await this.findOne(id, userId);

        return this.prisma.habit.update({
            where: { id },
            data: updateHabitDto,
        });
    }

    async delete(id: string, userId: string) {
        // Verify ownership
        await this.findOne(id, userId);

        // Soft delete
        return this.prisma.habit.update({
            where: { id },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });
    }

    async complete(id: string, userId: string, completeHabitDto: CompleteHabitDto) {
        // Verify ownership
        const habit = await this.findOne(id, userId);

        // Check if already completed today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const existingCompletion = await this.prisma.habitCompletion.findFirst({
            where: {
                habitId: id,
                userId,
                completedAt: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        });

        if (existingCompletion) {
            throw new BadRequestException('Habit already completed today');
        }

        // Create completion
        const completion = await this.prisma.habitCompletion.create({
            data: {
                habitId: id,
                userId,
                notes: completeHabitDto.notes,
                mood: completeHabitDto.mood,
            },
        });

        // Calculate new streak
        const newStreak = await this.calculateStreak(id, userId);
        const longestStreak = Math.max(newStreak, habit.longestStreak);

        // Update habit
        const updatedHabit = await this.prisma.habit.update({
            where: { id },
            data: {
                streak: newStreak,
                longestStreak,
                totalCompletions: habit.totalCompletions + 1,
                lastCompletedAt: new Date(),
            },
        });

        // Create timeline event
        await this.prisma.timelineEvent.create({
            data: {
                userId,
                eventType: 'HABIT',
                eventName: habit.name,
                relatedHabitId: id,
                duration: 30, // Default duration
                metadata: JSON.stringify({
                    mood: completeHabitDto.mood,
                    notes: completeHabitDto.notes,
                }),
            },
        });

        return {
            habit: updatedHabit,
            completion,
        };
    }

    private async calculateStreak(habitId: string, userId: string): Promise<number> {
        // Get all completions ordered by date descending
        const completions = await this.prisma.habitCompletion.findMany({
            where: {
                habitId,
                userId,
            },
            orderBy: {
                completedAt: 'desc',
            },
        });

        if (completions.length === 0) {
            return 0;
        }

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (const completion of completions) {
            const completionDate = new Date(completion.completedAt);
            completionDate.setHours(0, 0, 0, 0);

            const diffDays = Math.floor(
                (currentDate.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            // If completion is today or yesterday, increment streak
            if (diffDays === 0 || diffDays === 1) {
                streak++;
                currentDate = completionDate;
            } else {
                // Streak broken
                break;
            }
        }

        return streak;
    }

    async getCompletions(habitId: string, userId: string, limit: number = 30) {
        // Verify ownership
        await this.findOne(habitId, userId);

        return this.prisma.habitCompletion.findMany({
            where: {
                habitId,
                userId,
            },
            orderBy: {
                completedAt: 'desc',
            },
            take: limit,
        });
    }
}
