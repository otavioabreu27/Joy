import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { ClientesService } from '../services/clientes.service';
import { Response } from 'express';
import { Clientes } from '../../prisma';

@Controller('/clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get('/:id')
  async getClienteById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const cliente: Clientes | null =
        await this.clientesService.getClienteById(id);

      if (cliente) {
        res.status(200).json(cliente);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error fetching clientes by ID: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Get('')
  async getClienteByName(
    @Query('name') name: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const clientes: Array<Clientes> | null =
        await this.clientesService.getClienteByName(name);

      if (clientes) {
        res.status(200).json(clientes);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error fetching clientes by name: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }

  @Get('')
  async getClienteByServicoId(
    @Query('id_servico', ParseIntPipe) id_servico: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const clientes: Array<Clientes> | null =
        await this.clientesService.getClienteByServicoId(id_servico);

      if (clientes) {
        res.status(200).json(clientes);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      console.error(`Error fetching clientes by id_servico: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }
}
