import { Module } from '@nestjs/common';
import { ServicosController } from './controllers/servicos.controller';
import { ServicosService } from './services/servicos.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [ServicosController],
  providers: [ServicosService, PrismaService],
})
export class ServicosModule {}
