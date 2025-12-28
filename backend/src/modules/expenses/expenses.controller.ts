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
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto, UpdateExpenseDto } from './schemas/expense.schema';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { createExpenseSchema, updateExpenseSchema } from './schemas/expense.schema';

@ApiTags('expenses')
@ApiBearerAuth()
@Controller('expenses')
export class ExpensesController {
    constructor(private expensesService: ExpensesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all user expenses' })
    @ApiQuery({ name: 'startDate', required: false, type: String })
    @ApiQuery({ name: 'endDate', required: false, type: String })
    @ApiQuery({ name: 'category', required: false, type: String })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'offset', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Expenses retrieved' })
    async findAll(
        @CurrentUser('id') userId: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('category') category?: string,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        const limitNum = limit ? parseInt(limit) : 50;
        const offsetNum = offset ? parseInt(offset) : 0;

        return this.expensesService.findAll(
            userId,
            startDate,
            endDate,
            category,
            limitNum,
            offsetNum,
        );
    }

    @Get('summary')
    @ApiOperation({ summary: 'Get expense analytics summary' })
    @ApiQuery({ name: 'period', required: true, enum: ['today', 'week', 'month', 'year'] })
    @ApiResponse({ status: 200, description: 'Summary retrieved' })
    async getSummary(
        @CurrentUser('id') userId: string,
        @Query('period') period: string,
    ) {
        return this.expensesService.getSummary(userId, period);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get expense by ID' })
    @ApiResponse({ status: 200, description: 'Expense retrieved' })
    @ApiResponse({ status: 404, description: 'Expense not found' })
    async findOne(
        @Param('id') id: string,
        @CurrentUser('id') userId: string,
    ) {
        return this.expensesService.findOne(id, userId);
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createExpenseSchema))
    @ApiOperation({ summary: 'Create new expense' })
    @ApiResponse({ status: 201, description: 'Expense created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async create(
        @Body() createExpenseDto: CreateExpenseDto,
        @CurrentUser('id') userId: string,
    ) {
        return this.expensesService.create(userId, createExpenseDto);
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(updateExpenseSchema))
    @ApiOperation({ summary: 'Update expense' })
    @ApiResponse({ status: 200, description: 'Expense updated' })
    @ApiResponse({ status: 404, description: 'Expense not found' })
    async update(
        @Param('id') id: string,
        @Body() updateExpenseDto: UpdateExpenseDto,
        @CurrentUser('id') userId: string,
    ) {
        return this.expensesService.update(id, userId, updateExpenseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete expense' })
    @ApiResponse({ status: 204, description: 'Expense deleted' })
    @ApiResponse({ status: 404, description: 'Expense not found' })
    async delete(
        @Param('id') id: string,
        @CurrentUser('id') userId: string,
    ) {
        await this.expensesService.delete(id, userId);
    }
}
