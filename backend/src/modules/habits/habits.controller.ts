import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    UsePipes,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { HabitsService } from './habits.service';
import { CreateHabitDto, UpdateHabitDto, CompleteHabitDto, HabitResponseDto } from './dto/habit.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { createHabitSchema, updateHabitSchema, completeHabitSchema } from './schemas/habit.schema';

@ApiTags('habits')
@ApiBearerAuth()
@Controller('habits')
export class HabitsController {
    constructor(private habitsService: HabitsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all user habits' })
    @ApiQuery({ name: 'active', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Habits retrieved', type: [HabitResponseDto] })
    async findAll(
        @CurrentUser('id') userId: string,
        @Query('active') active?: string,
    ) {
        const activeOnly = active === 'false' ? false : true;
        return this.habitsService.findAll(userId, activeOnly);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get habit by ID' })
    @ApiResponse({ status: 200, description: 'Habit retrieved', type: HabitResponseDto })
    @ApiResponse({ status: 404, description: 'Habit not found' })
    async findOne(
        @Param('id') id: string,
        @CurrentUser('id') userId: string,
    ) {
        return this.habitsService.findOne(id, userId);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createHabitSchema))
    @ApiOperation({ summary: 'Create new habit' })
    @ApiResponse({ status: 201, description: 'Habit created', type: HabitResponseDto })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async create(
        @Body() createHabitDto: CreateHabitDto,
        @CurrentUser('id') userId: string,
    ) {
        return this.habitsService.create(userId, createHabitDto);
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(updateHabitSchema))
    @ApiOperation({ summary: 'Update habit' })
    @ApiResponse({ status: 200, description: 'Habit updated', type: HabitResponseDto })
    @ApiResponse({ status: 404, description: 'Habit not found' })
    async update(
        @Param('id') id: string,
        @Body() updateHabitDto: UpdateHabitDto,
        @CurrentUser('id') userId: string,
    ) {
        return this.habitsService.update(id, userId, updateHabitDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete habit' })
    @ApiResponse({ status: 204, description: 'Habit deleted' })
    @ApiResponse({ status: 404, description: 'Habit not found' })
    async delete(
        @Param('id') id: string,
        @CurrentUser('id') userId: string,
    ) {
        await this.habitsService.delete(id, userId);
    }

    @Post(':id/complete')
    @UsePipes(new ZodValidationPipe(completeHabitSchema))
    @ApiOperation({ summary: 'Mark habit as completed' })
    @ApiResponse({ status: 200, description: 'Habit completed' })
    @ApiResponse({ status: 400, description: 'Already completed today' })
    @ApiResponse({ status: 404, description: 'Habit not found' })
    async complete(
        @Param('id') id: string,
        @Body() completeHabitDto: CompleteHabitDto,
        @CurrentUser('id') userId: string,
    ) {
        return this.habitsService.complete(id, userId, completeHabitDto);
    }

    @Get(':id/completions')
    @ApiOperation({ summary: 'Get habit completion history' })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Completions retrieved' })
    async getCompletions(
        @Param('id') id: string,
        @CurrentUser('id') userId: string,
        @Query('limit') limit?: string,
    ) {
        const limitNum = limit ? parseInt(limit) : 30;
        return this.habitsService.getCompletions(id, userId, limitNum);
    }
}
