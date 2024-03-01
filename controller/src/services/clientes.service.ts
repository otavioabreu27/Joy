import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Clientes } from '../../prisma';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async getClienteById(id_cliente: number): Promise<Clientes> | null {
    const cliente: Clientes | null = await this.prisma.clientes.findUnique({
      where: {
        id_cliente: id_cliente,
      },
    });

    return cliente;
  }

  async getClienteByName(
    name_cliente: string,
  ): Promise<Array<Clientes>> | null {
    const clientes: Array<Clientes> | null =
      await this.prisma.clientes.findMany({
        where: {
          nome: {
            contains: name_cliente,
          },
        },
      });

    return clientes;
  }

  async getClienteByServicoId(
    id_servico: number,
  ): Promise<Array<Clientes>> | null {
    const clientes: Array<Clientes> | null =
      await this.prisma.clientes.findMany({
        where: {
          id_servico: id_servico,
        },
      });

    return clientes;
  }
}
