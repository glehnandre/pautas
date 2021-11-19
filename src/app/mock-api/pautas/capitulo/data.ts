import { TipoCapitulo } from "app/modules/acervo/model/enums/tipoCapitulo.enum";
import { Capitulo } from "app/modules/acervo/model/interfaces/capitulo.interface";
import { ministro } from "../ministro/data";

export const capitulo: Array<Capitulo> = [
    {
        id:     1,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        ordem:  1,
        tipo:   TipoCapitulo.Merito,
        dispositivo: 'Deferida em parte',
        ministros_acordam: [
            ministro[0],
            ministro[3],
        ],
        ministros_suspeitos: [
            ministro[4],
        ],
        ministros_impedidos: [
            ministro[6],
            ministro[7],
        ],
        ministro_condutor: ministro[3],
        texto: `
            <span class="px-2 bg-red-600 rounded-full text-white">Julgamento Suspenso</span>
            <br class="mb-4">
            <div>
                <p>Após a leitura do relatório, o julgamento foi suspenso.</p>
            </div>
        `,
    },
    {
        id:     2,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        ordem:  1,
        tipo:   TipoCapitulo.Merito,
        dispositivo: 'Deferida',
        ministros_acordam: [
            ministro[1]
        ],
        ministros_suspeitos: [
            ministro[2]
        ],
        ministros_impedidos: [
            ministro[3]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     3,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        ordem:  1,
        tipo:   TipoCapitulo.Merito,
        dispositivo: 'Provido',
        ministros_acordam: [
            ministro[3]
        ],
        ministros_suspeitos: [
            ministro[0]
        ],
        ministros_impedidos: [
            ministro[1]
        ],
        ministro_condutor: ministro[2],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     4,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        ordem:  1,
        tipo:   TipoCapitulo.Merito,
        dispositivo: 'Concedido',
        ministros_acordam: [
            ministro[1]
        ],
        ministros_suspeitos: [
            ministro[2]
        ],
        ministros_impedidos: [
            ministro[3]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     5,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        ordem:  1,
        tipo:   TipoCapitulo.Preliminar,
        dispositivo: 'Reconhecida',
        ministros_acordam: [
            ministro[1]
        ],
        ministros_suspeitos: [
            ministro[2]
        ],
        ministros_impedidos: [
            ministro[3]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     6,
        descricao: 'Recurso Extraordinário com agravo 1.299.544',
        ordem:  1,
        tipo:   TipoCapitulo.Tese,
        dispositivo: 'Reconhecida',
        ministros_acordam: [
            ministro[1]
        ],
        ministros_suspeitos: [
            ministro[2]
        ],
        ministros_impedidos: [
            ministro[3]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
    {
        id:     7,
        descricao: 'É constitucional o artigo 8º da Lei Complementar 173/2020, editado no âmbito do Programa Federativo de Enfrentamento ao Coronavírus SARS-CoV-2 (Covid-19).',
        ordem:  1,
        tipo:   TipoCapitulo.Questão_de_Ordem,
        dispositivo: 'Reconhecida',
        ministros_acordam: [
            ministro[1]
        ],
        ministros_suspeitos: [
            ministro[2]
        ],
        ministros_impedidos: [
            ministro[3]
        ],
        ministro_condutor: ministro[0],
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus neque nec ante porta tincidunt eu quis felis. Sed magna libero, sodales ut enim quis, varius faucibus lectus. Sed porttitor pharetra orci, quis fermentum risus rutrum id. Vivamus ornare purus a lorem accumsan cursus. Pellentesque ligula metus, dictum pretium dignissim non, fringilla ac lacus. Sed non dui nibh.'
    },
]
