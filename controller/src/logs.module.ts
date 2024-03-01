import { Module } from '@nestjs/common';
import { LogsControler } from './controllers/logs.controller';
import { LogsService } from './services/logs.service';

@Module({
  imports: [],
  controllers: [LogsControler],
  providers: [LogsService],
})
export class LogsModule {}
