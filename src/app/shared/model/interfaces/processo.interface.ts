import { SituacaoDoProcesso } from '../enums/situacaoDoProcesso.enum';
import { TipoDoProcesso } from '../enums/tipoDoProcesso.enum';
import { Capitulo } from './capitulo.interface';
import { Ministro } from './ministro.interface';
import { Documento } from './documento.interface';
import { Tag } from './tag.interface';
import { Envolvido } from './envolvido.interface';
import { Vista } from './vista.interface';
import { Destaque } from './destaque.interface';
import { Suspensao } from './suspensao.interface';

export interface Processo {
    id: number;
    ementa: string;
    lista: Tag[];
    classe: string;
    numero: number;
    cadeia: string;
    abreviacao: string;
    situacao: SituacaoDoProcesso;
    tipo: TipoDoProcesso;
    capitulos: Capitulo[];
    ministros_suspeitos: Ministro[];
    ministros_impedidos: Ministro[];
    vistas: Vista[];
    destaques: Destaque[];
    suspensoes: Suspensao[];
    relator?: Ministro;
    redator?: Ministro;
    checked?: boolean;
    documentos?: Documento[];
    id_tipo_recurso?: number;
    envolvidos: Envolvido[];
  }
