export interface Documento {
    id: number;
    nome: string;
    tipo: string;
    status: 'Assinado' | 'Cancelado';
    url: string;
  }