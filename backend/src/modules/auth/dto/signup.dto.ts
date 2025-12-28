import { ApiProperty } from '@nestjs/swagger';

class OnboardingDto {
    @ApiProperty()
    lifeAreas: {
        wellness: number;
        productivity: number;
        finance: number;
        relationships: number;
        learning: number;
        sleep: number;
    };

    @ApiProperty()
    primaryGoals: string[];

    @ApiProperty()
    currentHabits: string[];

    @ApiProperty()
    budget: number;

    @ApiProperty()
    wakeTime: string;

    @ApiProperty()
    bedTime: string;
}

export class SignupDto {
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    email: string;

    @ApiProperty({ example: 'Password123' })
    password: string;

    @ApiProperty({ example: 25 })
    age: number;

    @ApiProperty()
    onboarding: OnboardingDto;
}
