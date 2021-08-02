import { SituacaoDoProcesso } from "../enums/situacaoDoProcesso.enum";
import { TipoDoProcesso } from "../enums/tipodoprocesso.enum";
import { Capitulo } from "./capitulo.interface";
import { Tag } from "./tag.interface";

export interface Processo {
    id: number;
    nome: string;
    lista: Tag[];
    classe: string;
    numero: number;
    cadeira: number;
    descricao: string;
    situacao: SituacaoDoProcesso;
    tipo: TipoDoProcesso;
    capitulos: Capitulo[];
    checked?: boolean;
  }