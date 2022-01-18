import { Ministro } from "./ministro.interface";
import { Documento } from './documento.interface';

export interface DocumentoInteiroTeor {
    id: number;
    documento: Documento;
    autores: Array<Ministro>;
    responsavel: Ministro;
    comentario: string;
    data_criacao: string;
    revisado: boolean;
    ordem: number;
}
