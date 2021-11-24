export interface Dispositivo {
    id: number;
    nome: string;
    sentido: 'Positivo' | 'Negativo' | 'Neutro';
}