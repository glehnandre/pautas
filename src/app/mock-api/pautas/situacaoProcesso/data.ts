import { Pauta } from "app/modules/acervo/acoes/pautar/pautar.component";
import { StatusProcesso } from "app/modules/acervo/tabela/status/situacaoProcesso";

export const situacao: StatusProcesso[] = [
  { situacao: {id: 1, nome: 'Apto a Pautar'}, complemento: 'para MMA', descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020' },
  { situacao: {id: 2, nome: 'Em julgamento'}, complemento: 'para MMA', descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020' },
  { situacao: {id: 3, nome: 'Visto MDT'}, complemento: 'para MMA', descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020' },
  { situacao: {id: 4, nome: 'Pautado'}, complemento: 'para MMA', descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020' },
  { situacao: {id: 5, nome: 'Suspenso'}, complemento: 'para MMA', descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020' },
  { situacao: {id: 6, nome: 'Retirado de pauta'}, complemento: 'para MMA', descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020' },
  { situacao: {id: 7, nome: 'Retorno de Vista'}, complemento: 'para MMA', descricao: 'Vista para o Ministro Marco Aurélio no dia 24/04/2020' },
];