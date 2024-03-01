import { Controller, Get } from '@nestjs/common';
import { LogsService } from 'src/services/logs.service';

@Controller('/logs')
export class LogsControler {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  getTest(): string {
    return this.logsService.getTest();
  }
}
