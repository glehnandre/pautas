import { TipoCapitulo } from "../enums/tipoCapitulo.enum";
import { Destaque } from "./destaque.interface";
import { Dispositivo } from "./dispositivo.interface";
import { Ministro } from "./ministro.interface";
import { Processo } from "./processo.interface";
import { SessaoDeJulgamento } from "./sessao-julgamento.interface";
import { Vista } from "./vista.interface";

export interface Envolvido {
    nome: string;
    polo: string;
    categoria: string;
    identificacoes: Array<string>;
}

export interface Capitulo {
    id: number;
    descricao: string;
    tipo: TipoCapitulo;
    dispositivo: Dispositivo;
    ministros_acordam: Array<Ministro>;
    ministros_divergem: Array<Ministro>;
    ministro_condutor: Ministro;
    texto: string;
    sessao: SessaoDeJulgamento;
    processos_mesma_decisao: Processo[];
}

export interface CapitulosParaPublicacao {
    processo: number;
    cadeia: string;
    cadeia_extenso: string;
    classe: string;
    classe_extenso: string;
    numero: string;
    envolvidos: Array<Envolvido>
    redator: Ministro;
    relator: Ministro;
    ministros_suspeitos: Array<Ministro>;
    ministros_impedidos: Array<Ministro>;
    capitulos: Array<Capitulo>
    vistas: Array<Vista>,
    destaques: Array<Destaque>,
}
