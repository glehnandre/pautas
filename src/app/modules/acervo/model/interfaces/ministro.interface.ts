import { Cadeira } from "./cadeira.interface";

export interface Ministro {
    id: number;
    nome: string;
    abreviacao: string;
    cadeira: Cadeira;
    imagem?: string;
    filter?: string;
}