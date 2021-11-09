import { Ministro } from "./ministro.interface";

export interface DocumentoInteiroTeor {
    arquivo: string;
    autores: Array<Ministro>;
    responsavel: Ministro;
    comentario: string;
    nome: string;
    data_criacao: string;
    situacao: string;
    revisado: boolean;
    ordem: number;
}