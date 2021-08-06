import { SituacaoDoProcesso } from "../enums/situacaoDoProcesso.enum";
import { TipoDoProcesso } from "../enums/tipoDoProcesso.enum";
import { Cadeira } from "./cadeira.interface";
import { Capitulo } from "./capitulo.interface";
import { Tag } from "./tag.interface";

export interface Processo {
    id: number;
    ementa: string;
    lista: Tag[];
    classe: string;
    numero: number;
    nome: string;
    situacao: SituacaoDoProcesso;
    tipo: TipoDoProcesso;
    capitulos: Capitulo[];
    relator?: Cadeira;
    redator?: Cadeira;
    checked?: boolean;
  }