import { InformacoesDto } from "./informacoesDto.interface";
import { PublicacaoDto } from "./publicacaoDto.interface";

export interface DjeDto {
    agregacoes: InformacoesDto[];
    publicacoes: PublicacaoDto[];
    total: number;
}
