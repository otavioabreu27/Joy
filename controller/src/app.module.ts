import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes.module';
import { GruposModule } from './grupos.module';
import { LogsModule } from './logs.module';
import { ServicosModule } from './servicos.module';

@Module({
  imports: [ClientesModule, GruposModule, LogsModule, ServicosModule],
})
export class AppModule {}
