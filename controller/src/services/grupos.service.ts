import { Injectable } from '@nestjs/common';

@Injectable()
export class GruposService {
  getTest(): string {
    return 'test';
  }
}
