import {
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Param,
  Res,
  Query,
  Body,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { Servicos } from 'prisma';
import { CreateServicoDTO } from 'src/dto/CreateServicoDTO';
import { ServicosService } from 'src/services/servicos.service';

@Controller('/servico')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Get('/:id_servico')
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
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error fetching servico by ID: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Get('')
  async getServicoByName(
    @Query('name') name: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const servico: Array<Servicos> | null =
        await this.servicosService.getServicoByName(name);

      if (servico) {
        res.status(200).json(servico);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error fetching servico by name: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Get('')
  async getServicoByGrupo(
    @Query('id_grupo', ParseIntPipe) id_grupo: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const servico: Array<Servicos> | null =
        await this.servicosService.getServicoByGrupo(id_grupo);

      if (servico) {
        res.status(200).json(servico);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error fetching servico by grupo: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Post('')
  async createServico(
    @Body() servico: CreateServicoDTO,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const created_servico: Servicos | null =
        await this.servicosService.createServico(servico);

      if (created_servico) {
        res.status(201).json(created_servico);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error creating servico: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Put('/:id')
  async updateServico(
    @Param('id', ParseIntPipe) id_servico: number,
    @Body() servico: CreateServicoDTO,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const created_servico: Servicos | null =
        await this.servicosService.createServico(servico);

      if (created_servico) {
        res.status(201).json(created_servico);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error creating servico: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }
}
