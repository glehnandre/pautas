import { _closeDialogVia } from "@angular/material/dialog";
import { Classe } from "app/modules/acervo/model/interfaces/classe.interface";

export const classes: Classe[] = [
  {
    sigla: "ADI",
    descricao: "Ação Direta de Inconstitucionalidade",
    codigo: 600
  },  
  {
    sigla: "ADC",
    descricao: "Ação Declaratória de Constitucionalidade",
    codigo: 610
  },  
  {
    sigla: "ACO",
    descricao: "Ação Cívil Originária",
    codigo: 10
  },  
  {
    sigla: "Inq",
    descricao: "Inquérito",
    codigo: 140
  },  
  {
    sigla: "HC",
    descricao: "Habeas Corpus",
    codigo: 130
  },  
  {
    sigla: "RHC",
    descricao: "recurso Ordinário em Habeas Corpus",
    codigo: 440
  },  
  {
    sigla: "ARE",
    descricao: "Recurso Extraordinário com Agravo",
    codigo: 828
  },  
  {
    sigla: "RE",
    descricao: "Recurso Extraordinário",
    codigo: 210
  },  
];
