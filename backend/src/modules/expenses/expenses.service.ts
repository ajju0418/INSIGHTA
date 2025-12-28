import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
    constructor(private prisma: PrismaService) { }

    async findAll(
        userId: string,
        startDate?: string,
        endDate?: string,
        category?: string,
        limit: number = 50,
        offset: number = 0,
    ) {
        const where: any = {
            userId,
            isDeleted: false,
        };

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate);
            if (endDate) where.date.lte = new Date(endDate);
        }

        if (category) {
            where.category = category;
        }

        const [expenses, total] = await Promise.all([
            this.prisma.expense.findMany({
                where,
                orderBy: { date: 'desc' },
                take: limit,
                skip: offset,
            }),
            this.prisma.expense.count({ where }),
        ]);

        // Calculate summary
        const summary = await this.calculateSummary(userId, startDate, endDate);

        return {
            expenses,
            total,
            summary,
        };
    }

    async findOne(id: string, userId: string) {
        const expense = await this.prisma.expense.findFirst({
            where: {
                id,
                userId,
                isDeleted: false,
            },
        });

        if (!expense) {
            throw new NotFoundException('Expense not found');
        }

        return expense;
    }

    async create(userId: string, createExpenseDto: CreateExpenseDto) {
        const expense = await this.prisma.expense.create({
            data: {
                userId,
                amount: createExpenseDto.amount,
                category: createExpenseDto.category,
                description: createExpenseDto.description,
                date: createExpenseDto.date ? new Date(createExpenseDto.date) : new Date(),
                impact: createExpenseDto.impact,
                tags: createExpenseDto.tags ? JSON.stringify(createExpenseDto.tags) : null,
            },
        });

        // Create timeline event
        await this.prisma.timelineEvent.create({
            data: {
                userId,
                eventType: 'EXPENSE',
                eventName: `${createExpenseDto.category}: ₹${createExpenseDto.amount}`,
                relatedExpenseId: expense.id,
                startTime: expense.date,
                metadata: JSON.stringify({
                    amount: createExpenseDto.amount,
                    category: createExpenseDto.category,
                    description: createExpenseDto.description,
                }),
            },
        });

        return expense;
    }

    async update(id: string, userId: string, updateExpenseDto: UpdateExpenseDto) {
        // Verify ownership
        await this.findOne(id, userId);

        const updateData: any = {};

        if (updateExpenseDto.amount !== undefined) updateData.amount = updateExpenseDto.amount;
        if (updateExpenseDto.category) updateData.category = updateExpenseDto.category;
        if (updateExpenseDto.description !== undefined) updateData.description = updateExpenseDto.description;
        if (updateExpenseDto.date) updateData.date = new Date(updateExpenseDto.date);
        if (updateExpenseDto.impact) updateData.impact = updateExpenseDto.impact;
        if (updateExpenseDto.tags) updateData.tags = JSON.stringify(updateExpenseDto.tags);

        return this.prisma.expense.update({
            where: { id },
            data: updateData,
        });
    }

    async delete(id: string, userId: string) {
        // Verify ownership
        await this.findOne(id, userId);

        // Soft delete
        return this.prisma.expense.update({
            where: { id },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });
    }

    async getSummary(userId: string, period: string) {
        const { startDate, endDate } = this.getPeriodDates(period);

        const expenses = await this.prisma.expense.findMany({
            where: {
                userId,
                isDeleted: false,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

        const byCategory: Record<string, any> = {};
        const categories = ['food', 'transport', 'shopping', 'entertainment', 'coffee', 'other'];

        categories.forEach(cat => {
            const categoryExpenses = expenses.filter(e => e.category === cat);
            const amount = categoryExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
            byCategory[cat] = {
                amount,
                percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
                count: categoryExpenses.length,
            };
        });

        const topExpenses = expenses
            .sort((a, b) => Number(b.amount) - Number(a.amount))
            .slice(0, 5)
            .map(e => ({
                id: e.id,
                amount: Number(e.amount),
                category: e.category,
                date: e.date,
            }));

        const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const averageDaily = daysDiff > 0 ? totalSpent / daysDiff : 0;

        return {
            period,
            totalSpent: Math.round(totalSpent * 100) / 100,
            averageDaily: Math.round(averageDaily * 100) / 100,
            byCategory,
            topExpenses,
            trend: 'stable', // TODO: Implement trend calculation
        };
    }

    private async calculateSummary(userId: string, startDate?: string, endDate?: string) {
        const where: any = {
            userId,
            isDeleted: false,
        };

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate);
            if (endDate) where.date.lte = new Date(endDate);
        }

        const expenses = await this.prisma.expense.findMany({ where });
        const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

        const byCategory: Record<string, number> = {};
        expenses.forEach(exp => {
            byCategory[exp.category] = (byCategory[exp.category] || 0) + Number(exp.amount);
        });

        return {
            totalAmount: Math.round(totalAmount * 100) / 100,
            byCategory,
        };
    }

    private getPeriodDates(period: string): { startDate: Date; endDate: Date } {
        const endDate = new Date();
        const startDate = new Date();

        switch (period) {
            case 'today':
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'week':
                startDate.setDate(endDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(endDate.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;
            default:
                startDate.setDate(endDate.getDate() - 30);
        }

        return { startDate, endDate };
    }
}
