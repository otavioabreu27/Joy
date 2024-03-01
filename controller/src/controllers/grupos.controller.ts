import { Controller, Get } from '@nestjs/common';
import { GruposService } from 'src/services/grupos.service';

@Controller('/grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Get()
  getTest(): string {
    return this.gruposService.getTest();
  }
}
