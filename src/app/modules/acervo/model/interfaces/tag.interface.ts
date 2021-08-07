import { Cadeira } from "./cadeira.interface";

export interface Tag {
    id: number;
    descricao?: string;
    publica?: boolean;
    gestor?: Cadeira;
    checked?: boolean;
}