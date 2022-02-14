import { ItemDto } from "./itemDto.interface";

export interface InformacoesDto {
    nome: string;
    tipo: string;
    criterio: string;
    itens: ItemDto[];
}
