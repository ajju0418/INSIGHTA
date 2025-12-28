import { z } from 'zod';

const expenseCategories = ['food', 'transport', 'shopping', 'entertainment', 'coffee', 'other'] as const;
const impactTypes = ['positive', 'neutral', 'negative'] as const;

export const createExpenseSchema = z.object({
    amount: z.number().positive('Amount must be positive').max(1000000, 'Amount too large'),
    category: z.enum(expenseCategories, { errorMap: () => ({ message: 'Invalid category' }) }),
    description: z.string().max(200, 'Description too long').optional(),
    date: z.string().datetime().optional(),
    impact: z.enum(impactTypes).optional(),
    tags: z.array(z.string()).max(10, 'Maximum 10 tags').optional(),
});

export const updateExpenseSchema = z.object({
    amount: z.number().positive().max(1000000).optional(),
    category: z.enum(expenseCategories).optional(),
    description: z.string().max(200).optional(),
    date: z.string().datetime().optional(),
    impact: z.enum(impactTypes).optional(),
    tags: z.array(z.string()).max(10).optional(),
});

export type CreateExpenseDto = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseDto = z.infer<typeof updateExpenseSchema>;
