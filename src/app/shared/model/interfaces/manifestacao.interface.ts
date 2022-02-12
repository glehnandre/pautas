import { Ministro } from "./ministro.interface";

export interface Manifestacao {
    id: number;
    sentido: 'ACOMPANHAR' | 'DIVERGIR';
    ministro_relator: Ministro;	
    descricao: string;	
}