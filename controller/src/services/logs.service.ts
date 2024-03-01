import { Injectable } from '@nestjs/common';

@Injectable()
export class LogsService {
  getTest(): string {
    return 'test';
  }
}
