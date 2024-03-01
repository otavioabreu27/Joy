import { Module } from '@nestjs/common';
import { GruposController } from './controllers/grupos.controller';
import { GruposService } from './services/grupos.service';

@Module({
  imports: [],
  controllers: [GruposController],
  providers: [GruposService],
})
export class GruposModule {}
