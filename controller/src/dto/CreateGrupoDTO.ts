import { IsString } from 'class-validator';

export class CreateGrupoDTO {
  @IsString()
  readonly nome: string;

  @IsString()
  readonly descricao: string;
}
