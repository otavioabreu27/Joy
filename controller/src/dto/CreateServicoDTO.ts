import { IsInt, IsString } from 'class-validator';

export class CreateServicoDTO {
  @IsInt()
  readonly id_grupo: number;

  @IsString()
  readonly nome: string;

  @IsString()
  readonly descricao: string;
}
