import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Servicos } from '../../prisma';
import { CreateServicoDTO } from 'src/dto/CreateServicoDTO';

@Injectable()
export class ServicosService {
  constructor(private readonly prisma: PrismaService) {}

  async getServicoById(id_servico: number): Promise<Servicos> | null {
    const servico: Servicos | null = await this.prisma.servicos.findUnique({
      where: {
        id_servico: id_servico,
      },
    });

    return servico;
  }

  async getServicoByName(name: string): Promise<Array<Servicos>> | null {
    const servicos: Array<Servicos> | null =
      await this.prisma.servicos.findMany({
        where: {
          nome: {
            contains: name,
          },
        },
      });

    return servicos;
  }

  async getServicoByGrupo(id_grupo: number): Promise<Array<Servicos>> | null {
    const servicos: Array<Servicos> | null =
      await this.prisma.servicos.findMany({
        where: {
          id_grupo: id_grupo,
        },
      });

    return servicos;
  }

  async createServico(servico: CreateServicoDTO): Promise<Servicos> | null {
    const created_servico: Servicos | null = await this.prisma.servicos.create({
      data: {
        id_grupo: servico.id_grupo,
        nome: servico.nome,
        descricao: servico.descricao,
      },
    });

    return created_servico;
  }

  async updateServico(servico: Servicos): Promise<void> {
    await this.prisma.servicos.update({
      where: {
        id_servico: servico.id_servico,
      },
      data: {
        id_grupo: servico.id_grupo,
        nome: servico.nome,
        descricao: servico.descricao,
      },
    });
  }

  async deleteServico(id_servico: number): Promise<Servicos> | null {
    const servico: Servicos | null = await this.prisma.servicos.delete({
      where: { id_servico: id_servico },
    });

    return servico;
  }
}
