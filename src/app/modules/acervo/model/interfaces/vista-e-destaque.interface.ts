export interface Vista {
    id: number;
    ministro: number;
    processo: number;
    sessao: number;
    data: string;
    texto: string;
}

export interface Destaque {
    id: number;
    data: string;
    processo: number;
    ministro: number;
    sessao: number;
    texto: string;
}
