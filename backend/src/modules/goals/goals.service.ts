import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGoalDto, UpdateGoalDto } from './schemas/goal.schema';

@Injectable()
export class GoalsService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string, completed?: boolean) {
        return this.prisma.goal.findMany({
            where: {
                userId,
                isDeleted: false,
                ...(completed !== undefined && { isCompleted: completed }),
            },
            orderBy: [
                { isCompleted: 'asc' },
                { createdAt: 'desc' },
            ],
        });
    }

    async findOne(id: string, userId: string) {
        const goal = await this.prisma.goal.findFirst({
            where: {
                id,
                userId,
                isDeleted: false,
            },
        });

        if (!goal) {
            throw new NotFoundException('Goal not found');
        }

        return this.calculateProgress(goal);
    }

    async create(userId: string, createGoalDto: CreateGoalDto) {
        const goal = await this.prisma.goal.create({
            data: {
                userId,
                name: createGoalDto.name,
                type: createGoalDto.type,
                target: createGoalDto.target,
                current: createGoalDto.current || 0,
                unit: createGoalDto.unit,
                icon: createGoalDto.icon,
                color: createGoalDto.color,
                deadline: createGoalDto.deadline,
                deadlineDate: createGoalDto.deadlineDate ? new Date(createGoalDto.deadlineDate) : null,
            },
        });

        return this.calculateProgress(goal);
    }

    async update(id: string, userId: string, updateGoalDto: UpdateGoalDto) {
        // Verify ownership
        const existingGoal = await this.findOne(id, userId);

        const updateData: any = {};

        if (updateGoalDto.name) updateData.name = updateGoalDto.name;
        if (updateGoalDto.target !== undefined) updateData.target = updateGoalDto.target;
        if (updateGoalDto.current !== undefined) updateData.current = updateGoalDto.current;
        if (updateGoalDto.deadline) updateData.deadline = updateGoalDto.deadline;
        if (updateGoalDto.deadlineDate) updateData.deadlineDate = new Date(updateGoalDto.deadlineDate);

        const updatedGoal = await this.prisma.goal.update({
            where: { id },
            data: updateData,
        });

        // Check if goal should be auto-completed
        const current = Number(updatedGoal.current);
        const target = Number(updatedGoal.target);

        if (current >= target && !updatedGoal.isCompleted) {
            const completedGoal = await this.prisma.goal.update({
                where: { id },
                data: {
                    isCompleted: true,
                    completedAt: new Date(),
                },
            });

            // Create timeline event for goal completion
            await this.prisma.timelineEvent.create({
                data: {
                    userId,
                    eventType: 'GOAL',
                    eventName: `Completed: ${completedGoal.name}`,
                    relatedGoalId: id,
                    metadata: JSON.stringify({
                        progress: 100,
                        target: target,
                        current: current,
                    }),
                },
            });

            return this.calculateProgress(completedGoal);
        }

        return this.calculateProgress(updatedGoal);
    }

    async delete(id: string, userId: string) {
        // Verify ownership
        await this.findOne(id, userId);

        // Soft delete
        return this.prisma.goal.update({
            where: { id },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });
    }

    private calculateProgress(goal: any) {
        const current = Number(goal.current);
        const target = Number(goal.target);
        const progress = target > 0 ? Math.min((current / target) * 100, 100) : 0;

        return {
            ...goal,
            progress: Math.round(progress * 10) / 10, // Round to 1 decimal
        };
    }
}
