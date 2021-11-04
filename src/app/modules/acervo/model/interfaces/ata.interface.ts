import { CapitulosParaPublicacao } from "./capitulo.interface";

export interface Ata {
    total_julgados: number;
    total_suspensos: number;
    total_vista: number;
    total_destaque: number;
    total_nao_julgados: number;
    "capitulos para publicacao": Array<CapitulosParaPublicacao>;
}
