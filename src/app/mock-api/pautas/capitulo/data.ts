import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { Capitulo } from "app/modules/acervo/model/interfaces/capitulo.interface";
import { dispositivos } from "../dispositivo/data";
import { ministro } from "../ministro/data";

export const capitulo: Array<Capitulo> = [
    {
        id:     1,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        tipo:   TipoCapitulo.Preliminar,
        dispositivo: dispositivos[0],
        ministros_acordam: [
            ministro[5],
            ministro[6],
        ],
        ministros_divergem: [
            ministro[7],
        ],
        ministro_condutor: ministro[3],
        texto: `O tribunal por maioria, apreciando o tema 386 da repercursão geral,
        negou provimento ao recurso extraordinário, nos termos do voto do Ministro Edson Fachin, Redator para o Acordão`,
    },
    {
        id:     2,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        tipo:   TipoCapitulo.Merito,
        dispositivo: { id:1, nome: 'Fixa a Tese', sentido: 'Positivo' },
        ministros_acordam: [
            ministro[1]
        ],
        ministros_divergem: [
            ministro[2]
        ],
        ministro_condutor: ministro[0],
        texto: `"Nos termos do artigo 5º, VIII, da Constituição Federal é possível a realização de etapas de concurso
        publico em datas e horários distintos dos previstos em edital, por candidato que invoca escusa de consciência por
        motivo de crença religiosa, desde que presentes a razoabilidade da alteração, a preservação da igualdade entre
        todos os candidatos e que não acarrete ônus desproporcional à Administração Pública, que deverá decidir de
        maneira fundamentada"`
    },
    {
        id:     3,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        tipo:   TipoCapitulo.Merito,
        dispositivo: { id:0, nome: 'Procedente', sentido: 'Neutro' },
        ministros_acordam: [
            ministro[3]
        ],
        ministros_divergem: [
            ministro[0]
        ],
        ministro_condutor: ministro[2],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     4,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        tipo:   TipoCapitulo.Modulacao,
        dispositivo: { id:0, nome: 'Lorem Ipsum', sentido: 'Neutro' },
        ministros_acordam: [
            ministro[1]
        ],
        ministros_divergem: [
            ministro[2]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     5,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        tipo:   TipoCapitulo.Preliminar,
        dispositivo: { id:0, nome: 'Lorem Ipsum', sentido: 'Neutro' },
        ministros_acordam: [
            ministro[1]
        ],
        ministros_divergem: [
            ministro[2]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     6,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        tipo:   TipoCapitulo.Tese,
        dispositivo: { id:0, nome: 'Lorem Ipsum', sentido: 'Neutro' },
        ministros_acordam: [
            ministro[1]
        ],
        ministros_divergem: [
            ministro[2]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     7,
        descricao: 'É constitucional o artigo 8º da Lei Complementar 173/2020, editado no âmbito do Programa Federativo de Enfrentamento ao Coronavírus SARS-CoV-2 (Covid-19).',
        tipo:   TipoCapitulo.Questão_de_Ordem,
        dispositivo: { id:0, nome: 'Lorem Ipsum', sentido: 'Neutro' },
        ministros_acordam: [
            ministro[1]
        ],
        ministros_divergem: [
            ministro[2]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
]
