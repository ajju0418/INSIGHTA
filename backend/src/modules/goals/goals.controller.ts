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
import { GoalsService } from './goals.service';
import { CreateGoalDto, UpdateGoalDto } from './schemas/goal.schema';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { createGoalSchema, updateGoalSchema } from './schemas/goal.schema';

@ApiTags('goals')
@ApiBearerAuth()
@Controller('goals')
export class GoalsController {
    constructor(private goalsService: GoalsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all user goals' })
    @ApiQuery({ name: 'completed', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Goals retrieved' })
    async findAll(
        @CurrentUser('id') userId: string,
        @Query('completed') completed?: string,
    ) {
        const completedFilter = completed === 'true' ? true : completed === 'false' ? false : undefined;
        return this.goalsService.findAll(userId, completedFilter);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get goal by ID' })
    @ApiResponse({ status: 200, description: 'Goal retrieved' })
    @ApiResponse({ status: 404, description: 'Goal not found' })
    async findOne(
        @Param('id') id: string,
        @CurrentUser('id') userId: string,
    ) {
        return this.goalsService.findOne(id, userId);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createGoalSchema))
    @ApiOperation({ summary: 'Create new goal' })
    @ApiResponse({ status: 201, description: 'Goal created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async create(
        @Body() createGoalDto: CreateGoalDto,
        @CurrentUser('id') userId: string,
    ) {
        return this.goalsService.create(userId, createGoalDto);
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(updateGoalSchema))
    @ApiOperation({ summary: 'Update goal progress or details' })
    @ApiResponse({ status: 200, description: 'Goal updated' })
    @ApiResponse({ status: 404, description: 'Goal not found' })
    async update(
        @Param('id') id: string,
        @Body() updateGoalDto: UpdateGoalDto,
        @CurrentUser('id') userId: string,
    ) {
        return this.goalsService.update(id, userId, updateGoalDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete goal' })
    @ApiResponse({ status: 204, description: 'Goal deleted' })
    @ApiResponse({ status: 404, description: 'Goal not found' })
    async delete(
        @Param('id') id: string,
        @CurrentUser('id') userId: string,
    ) {
        await this.goalsService.delete(id, userId);
    }
}
