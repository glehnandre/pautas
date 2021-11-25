import { TipoCapitulo } from "../enums/tipoCapitulo.enum";
import { Ministro } from "./ministro.interface";

export interface Envolvido {
    nome: string;
    polo: string;
    categoria: string;
    identificacoes: Array<string>;
}

export interface Capitulo {
    id: number;
    descricao: string;
    ordem: number;
    tipo: TipoCapitulo;
    dispositivo: string;
    ministros_acordam: Array<Ministro>;
    ministros_divergem: Array<Ministro>;
    ministro_condutor: Ministro;
    texto: string;
}

export interface CapitulosParaPublicacao {
    cadeia: string;
    classe: string;
    classe_extenso: string;
    numero: string;
    envolvidos: Array<Envolvido>
    redator: Ministro;
    relator: Ministro;
    ministros_suspeitos: Array<Ministro>;
    ministros_impedidos: Array<Ministro>;
    capitulos: Array<Capitulo>
}
