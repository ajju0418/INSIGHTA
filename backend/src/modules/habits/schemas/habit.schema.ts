import { z } from 'zod';

export const createHabitSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
    icon: z.string().optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color').optional(),
    targetTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)').optional(),
    reminderEnabled: z.boolean().optional().default(false),
});

export const updateHabitSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    icon: z.string().optional(),
    color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    targetTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    reminderEnabled: z.boolean().optional(),
});

export const completeHabitSchema = z.object({
    notes: z.string().max(500, 'Notes too long').optional(),
    mood: z.enum(['great', 'good', 'okay', 'bad']).optional(),
});

export type CreateHabitDto = z.infer<typeof createHabitSchema>;
export type UpdateHabitDto = z.infer<typeof updateHabitSchema>;
export type CompleteHabitDto = z.infer<typeof completeHabitSchema>;
