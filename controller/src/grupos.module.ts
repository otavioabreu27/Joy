import { Module } from '@nestjs/common';
import { GruposController } from './controllers/grupos.controller';
import { GruposService } from './services/grupos.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [GruposController],
  providers: [GruposService, PrismaService],
})
export class GruposModule {}
