import { CapitulosParaPublicacao } from "./capitulo.interface";
import { SessaoJulgamento } from "./sessao-julgamento.interface";

export interface Ata {
  cabecalho: string,
  total_julgados: number,
  total_vista: number,
  total_destaque: number,
  total_nao_julgados: number,
  total_suspensos: number,
  sessao: SessaoJulgamento;
  capitulos_para_publicacao: Array<CapitulosParaPublicacao>;
}
