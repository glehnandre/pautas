import { processo } from "../processos/data";

export const pautas: any[] = [
  {
    data_inicio: '06/25/2021',
    data_fim: '06/26/2021',
    assunto: 'Teste dos dados da pauta',
    colegiado: 'Colegiado',
    pautas: [
      processo[0],
      processo[1],
    ],
  }
];