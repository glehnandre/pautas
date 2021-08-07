import { Pauta } from "app/modules/acervo/model/interfaces/pauta.interface";
import { processo } from "../processos/data";

export const pautas: Pauta[] = [
  {
    data_inicio: '2021-08-02T03:00:00.000Z',
    data_fim: '2021-08-05T03:00:00.000Z',
    assunto: 'Teste dos dados da pauta',
    colegiado: 'segunda-turma',
    sessao: 1,
    processos: [
      processo[0],
      processo[3],
    ],
  }
];