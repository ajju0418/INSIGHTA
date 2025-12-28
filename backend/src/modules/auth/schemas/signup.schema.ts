import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    age: z.number().int().min(18, 'Must be at least 18 years old').max(120, 'Invalid age'),
    onboarding: z.object({
        lifeAreas: z.object({
            wellness: z.number().int().min(1).max(10),
            productivity: z.number().int().min(1).max(10),
            finance: z.number().int().min(1).max(10),
            relationships: z.number().int().min(1).max(10),
            learning: z.number().int().min(1).max(10),
            sleep: z.number().int().min(1).max(10),
        }),
        primaryGoals: z.array(z.string()).min(3, 'Select at least 3 goals').max(5, 'Maximum 5 goals'),
        currentHabits: z.array(z.string()),
        budget: z.number().positive('Budget must be positive'),
        wakeTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
        bedTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
    }),
});

export type SignupDto = z.infer<typeof signupSchema>;
