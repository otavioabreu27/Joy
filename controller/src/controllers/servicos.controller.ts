import { Controller, Get, ParseIntPipe, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Servicos } from 'prisma';
import { ServicosService } from 'src/services/servicos.service';

@Controller('/servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Get('/id/:id_servico')
  async getServicoById(
    @Param('id_servico', ParseIntPipe) id_servico: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const servico: Servicos | null =
        await this.servicosService.getServicoById(id_servico);

      if (servico) {
        res.status(200).json(servico);
      } else {
        res.status(204).end();
      }
    } catch (e) {
      console.error(`Error fetching servico by ID: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Get('/name/:name')
  async getServicoByName(
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const servico: Array<Servicos> | null =
        await this.servicosService.getServicoByName(name);

      if (servico) {
        res.status(200).json(servico);
      } else {
        res.status(204);
      }
    } catch (e) {
      console.error(`Error fetching servico by name: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Get('/id_grupo/:id_grupo')
  async getServicoByGrupo(
    @Param('id_grupo', ParseIntPipe) id_grupo: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const servico: Array<Servicos> | null =
        await this.servicosService.getServicoByGrupo(id_grupo);

      if (servico) {
        res.status(200).json(servico);
      } else {
        res.status(204);
      }
    } catch (e) {
      console.error(`Error fetching servico by grupo: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }
}
