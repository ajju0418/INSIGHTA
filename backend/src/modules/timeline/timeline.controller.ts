import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TimelineService } from './timeline.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('analytics')
@ApiBearerAuth()
@Controller('analytics/timeline')
export class TimelineController {
    constructor(private timelineService: TimelineService) { }

    @Get()
    @ApiOperation({ summary: 'Get daily timeline events' })
    @ApiQuery({ name: 'date', required: false, type: String, description: 'Date in YYYY-MM-DD format' })
    @ApiResponse({ status: 200, description: 'Timeline retrieved' })
    async getTimeline(
        @CurrentUser('id') userId: string,
        @Query('date') date?: string,
    ) {
        return this.timelineService.getTimeline(userId, date);
    }
}
