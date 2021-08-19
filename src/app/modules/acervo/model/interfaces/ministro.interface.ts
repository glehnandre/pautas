import { Cadeira } from "./cadeira.interface";

export interface Ministro {
    id: number;
    nome: string;
    imagem?: string,
    abreviacao: string;
    cadeira: Cadeira;
    imagem?: string;
}