import { Controller, Get } from '@nestjs/common';
import { SubscriptionReportService } from './subscription-report.service';

@Controller('api/v1/subscriptions')
export class SubscriptionReportController {
  constructor(private readonly reportService: SubscriptionReportService) {}

  @Get('ending-tomorrow')
  async getReport() {
    const data = await this.reportService.getEndingTomorrowReport();
    return { success: true, data };
  }
}
