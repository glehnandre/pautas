export interface SessaoJulgamento{
    id: number;
    numero: number;
    ano: number;
    colegiado: string;
    tipo: String;
    categoria: string;
    modalidade: string;
    data_inicio: Date;
    data_fim: Date;
    situacao?: string;
}

export enum Colegiado{
    'Primeira turma',
    'Segunda turma',
    'Pleno'
}

export enum TipoSessao{ 
    'Ordinária', 
    'Extraordinária'
}

export enum CategoriaSessao{
    'Repercussão Geral', 
    'Judicial', 
    'Administrativa'
}

export enum ModalidadeSessao{
    'Virtual', 
    'Em tempo real'
}