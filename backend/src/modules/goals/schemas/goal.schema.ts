import { z } from 'zod';

export const createGoalSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(200, 'Name too long'),
    type: z.enum(['habit', 'budget', 'milestone'], { errorMap: () => ({ message: 'Invalid goal type' }) }),
    target: z.number().positive('Target must be positive'),
    current: z.number().min(0, 'Current cannot be negative').optional().default(0),
    unit: z.string().min(1).max(20),
    icon: z.string().optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional(),
    deadline: z.string().max(50).optional(),
    deadlineDate: z.string().datetime().optional(),
});

export const updateGoalSchema = z.object({
    name: z.string().min(2).max(200).optional(),
    current: z.number().min(0).optional(),
    target: z.number().positive().optional(),
    deadline: z.string().max(50).optional(),
    deadlineDate: z.string().datetime().optional(),
});

export type CreateGoalDto = z.infer<typeof createGoalSchema>;
export type UpdateGoalDto = z.infer<typeof updateGoalSchema>;
