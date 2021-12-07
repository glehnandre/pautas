export interface Documento {
    id: number;
    nome: string;
    tipo: string;
    status: 'Assinado' | 'Cancelado';
    url: string;
    data_criacao: string;
    data_modificacao: string;
  }
