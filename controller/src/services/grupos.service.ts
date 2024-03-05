import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Grupos } from 'prisma';
import { CreateGrupoDTO } from 'src/dto/CreateGrupoDTO';

@Injectable()
export class GruposService {
  constructor(private readonly prisma: PrismaService) {}

  async getGrupoById(id_grupo: number): Promise<Grupos> | null {
    const grupo: Grupos | null = await this.prisma.grupos.findUnique({
      where: {
        id_grupo: id_grupo,
      },
    });

    return grupo;
  }

  async getGrupoByName(name: string): Promise<Array<Grupos>> | null {
    const grupos: Array<Grupos> | null = await this.prisma.grupos.findMany({
      where: {
        nome: {
          contains: name,
        },
      },
    });

    return grupos;
  }

  async createGrupo(grupo: CreateGrupoDTO): Promise<Grupos> | null {
    const created_grupo: Grupos | null = await this.prisma.grupos.create({
      data: {
        nome: grupo.nome,
        descricao: grupo.descricao,
      },
    });

    return created_grupo;
  }

  async updateGrupo(grupo: Grupos): Promise<Grupos> | null {
    const updated_grupo: Grupos | null = await this.prisma.grupos.update({
      where: {
        id_grupo: grupo.id_grupo,
      },
      data: {
        nome: grupo.nome,
        descricao: grupo.descricao,
      },
    });

    return updated_grupo;
  }

  async deleteGrupo(id_grupo: number): Promise<Grupos> | null {
    const deleted_grupo: Grupos | null = await this.prisma.grupos.delete({
      where: {
        id_grupo: id_grupo,
      },
    });

    return deleted_grupo;
  }
}
