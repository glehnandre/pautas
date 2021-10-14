import { SituacaoDoProcesso } from '../enums/situacaoDoProcesso.enum';
import { TipoDoProcesso } from '../enums/tipoDoProcesso.enum';
import { Capitulo } from './capitulo.interface';
import { Ministro } from './ministro.interface';
import { Documento } from './documento.interface';
import { Tag } from './tag.interface';

export interface Processo {
    id: number;
    ementa: string;
    lista: Tag[];
    classe: string;
    numero: number;
    nome: string;
    abreviacao: string;
    situacao: SituacaoDoProcesso;
    tipo: TipoDoProcesso;
    capitulos: Capitulo[];
    relator?: Ministro;
    redator?: Ministro;
    checked?: boolean;
    documentos?: Documento[];
  }
