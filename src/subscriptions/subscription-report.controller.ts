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
  
  @Get('charge-attempts')
  async getChargeAttempts() {
    const data = await this.reportService.getChargeAttempts();
    return { success: true, data };
  }
  
  @Get('overall-stats')
  async overallStats() {
    const data = await this.reportService.overallData();
    return { success: true, data };
  }
}
