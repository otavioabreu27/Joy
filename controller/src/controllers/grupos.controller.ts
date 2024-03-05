import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Grupos } from 'prisma';
import { CreateGrupoDTO } from 'src/dto/CreateGrupoDTO';
import { GruposService } from 'src/services/grupos.service';

@Controller('/grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Get('/:id')
  async getGrupoById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const grupo: Grupos | null = await this.gruposService.getGrupoById(id);

      if (grupo) {
        res.status(200).json(grupo);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error fetching grupo by ID: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Get('/')
  async getGrupoByName(
    @Query('name') name: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const grupo: Array<Grupos> | null =
        await this.gruposService.getGrupoByName(name);

      if (grupo) {
        res.status(200).json(grupo);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error fetching grupo by ID: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Post('/')
  async createGrupo(
    @Body() grupo: CreateGrupoDTO,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const created_grupo: Grupos | null =
        await this.gruposService.createGrupo(grupo);

      if (created_grupo) {
        res.status(200).json(grupo);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error creating grupo: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Put('/')
  async updateGrupo(
    @Body() grupo: Grupos,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.gruposService.updateGrupo(grupo);
      res.status(204).send();
    } catch (e) {
      console.error(`Error updating grupo: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Delete('/:id')
  async deleteGrupo(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const grupo: Grupos | null = await this.gruposService.deleteGrupo(id);

      if (grupo) {
        res.status(200).json(grupo);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error deleting grupo: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }
}
