export interface StatusProcesso {
  situacao: SituacaoProcesso;
  complemento: string;
  descricao: string;
}

export interface SituacaoProcesso {
  id: number;
  nome: string;
}