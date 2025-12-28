import { ApiProperty } from '@nestjs/swagger';

export class CreateHabitDto {
    @ApiProperty({ example: 'Morning Meditation' })
    name: string;

    @ApiProperty({ example: 'brain', required: false })
    icon?: string;

    @ApiProperty({ example: '#10B981', required: false })
    color?: string;

    @ApiProperty({ example: '07:00', required: false })
    targetTime?: string;

    @ApiProperty({ example: true, required: false })
    reminderEnabled?: boolean;
}

export class UpdateHabitDto {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    icon?: string;

    @ApiProperty({ required: false })
    color?: string;

    @ApiProperty({ required: false })
    targetTime?: string;

    @ApiProperty({ required: false })
    reminderEnabled?: boolean;
}

export class CompleteHabitDto {
    @ApiProperty({ required: false, example: 'Felt great today!' })
    notes?: string;

    @ApiProperty({ required: false, enum: ['great', 'good', 'okay', 'bad'] })
    mood?: 'great' | 'good' | 'okay' | 'bad';
}

export class HabitResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    icon: string | null;

    @ApiProperty()
    color: string | null;

    @ApiProperty()
    streak: number;

    @ApiProperty()
    longestStreak: number;

    @ApiProperty()
    totalCompletions: number;

    @ApiProperty()
    targetTime: string | null;

    @ApiProperty()
    reminderEnabled: boolean;

    @ApiProperty()
    lastCompletedAt: Date | null;

    @ApiProperty()
    createdAt: Date;
}

export class HabitCompletionResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    habitId: string;

    @ApiProperty()
    completedAt: Date;

    @ApiProperty()
    notes: string | null;

    @ApiProperty()
    mood: string | null;
}
