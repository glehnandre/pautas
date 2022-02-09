import { CapitulosParaPublicacao } from "./capitulo.interface";
import { Ministro } from "./ministro.interface";

export interface Ata {
  cabecalho?: string,
  secretario?: string;
  outros_presentes?: string,
  total_julgados: number,
  total_vista: number,
  total_destaque: number,
  total_nao_julgados: number,
  total_suspensos: number,
  ministros_presentes?: Array<Ministro>;
  ministros_ausentes?: Array<Ministro>;
  presidencia?: Ministro;
}
