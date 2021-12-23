import { TipoRecursoDto } from "app/modules/acervo/model/interfaces/tipoRecursoDto";

export const recursos: TipoRecursoDto[] = [
  {
    id: 1,
    sigla: "Mérito",
    descricao: "Mérito",
  },
  {
    id: 12,
    sigla: "AgR",
    descricao: "Agravo Regimental",
  },

  {
    id: 15,
    sigla: 'ED',
    descricao: 'Embargo de Declaração',
  },

  {
    id: 42,
    sigla: 'MC',
    descricao: 'Medida Cautelar',
  }
];