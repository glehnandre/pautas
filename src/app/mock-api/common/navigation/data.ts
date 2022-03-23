/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
   /* {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : '',
        link : '/example'
    },
    {
        id   : 'acervo',
        title: 'Acervo Efetivo',
        type : 'basic',
        icon : '',
        link : '/acervo'
    },
    {
        id   : 'resposta-solicitacao-sessao-extraordinaria',
        title: 'Resposta de Solicitação de Julgamento Extraordinario',
        type : 'basic',
        icon : '',
        link : '/resposta-solicitacao-sessao-extraordinaria',
        queryParams: {
            numero: 1000,
            ano: 2021,
        }
    },
    {
        id   : 'sessao-extraordinaria',
        title: 'Solicitar Sessão Extraordinária',
        type : 'basic',
        icon : '',
        link : '/sessao-extraordinaria',
        queryParams: {
            numero: 1000,
            ano: 2021,
        }
    },
    {
        id   : 'criacao-colegiado',
        title: 'Criação do Colegiado',
        type : 'basic',
        icon : '',
        link : '/criacao-colegiado',
        queryParams: {
            processo: 1,
            data: '2016-08-29T09%3A12%3A33.001Z',
            colegiado: 'pleno',
            sessao: '1000-2021',
        }
    },*/
    {
        id   : 'sessoes-julgamento',
        title: 'Pesquisa de Sessões de Julgamento',
        type : 'basic',
        icon : '',
        link : '/sessoes-julgamento',
    },
    {
        id: 'minhas-tarefas',
        title: 'Minhas tarefas',
        type: 'basic',
        icon : '',
        link: '/minhas-tarefas'
    },
    {
        id: 'publicacoes',
        title: '(Pós-Julgamento) DJe',
        type: 'basic',
        icon : '',
        link: '/publicacoes'
    },
    {
        id   : 'resultado-julgamento',
        title: '(Pós-Julgamento) Resultado do Julgamento',
        type : 'basic',
        icon : '',
        link : '/resultado-julgamento',
        queryParams: {
            processo: '9',
            colegiado: 'pleno',
            numero: 1000,
            ano: 2021, 
        },
    },
    {
        id: 'revisar-inteiro-teor',
        title: '(Pós-Julgamento) Revisar Inteiro Teor',
        type: 'basic',
        icon : '',
        link: '/revisar-inteiro-teor',
        queryParams: {
            id: 9,
        },
    },
    {
        id   :  'revisar-extrato-ata',
        title:  '(Pós-Julgamento) Revisar o Extrato da Ata de Julgamento',
        type :  'basic',
        icon :  '',
        link :  '/revisar-extrato-ata',
        queryParams: {
            numero: 1000,
            ano: 2021,
        },
    },
    {
        id   : 'finalizar-sessao-julgamento',
        title: '(Pós-Julgamento) Finalizar Sessao de Julgamento',
        type : 'basic',
        icon : '',
        link : '/finalizar-sessao-julgamento',
        queryParams: {
            numero: 1000,
            ano: 2021,
        },
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
    {
        id   : 'acervo',
        title: 'Acervo',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/acervo'
    },
    {
        id   : 'julgamento-extraordinario',
        title: 'Julgamento Extraordinario',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/julgamento-extraordinario'
    },
    {
        id   : 'sessao-extraordinaria',
        title: 'Solicitar Sessão Extraordinária',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/sessao-extraordinaria'
    },
    {
        id   : 'criacao-colegiado',
        title: 'Criação do Colegiado',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/criacao-colegiado',
        queryParams: {
            processo: 1,
            data: '2016-08-29T09%3A12%3A33.001Z',
            colegiado: 'pleno',
            sessao: '1000-2021',
        }
    },
    {
        id   : 'sessoes-julgamento',
        title: 'Sessões de Julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/sessoes-julgamento',
        queryParams: {
            numero: 1000,
            ano: 2021,
        }
    },
    {
        id   : 'resultado-julgamento',
        title: 'Resultado do Julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/resultado-julgamento',
        queryParams: {
            processo: '9',
            colegiado: 'pleno',
        },
    },
    {
        id: 'minhas-tarefas',
        title: 'Minhas tarefas',
        type: 'basic',
        icon : 'heroicons_outline:chart-pie',
        link: '/minhas-tarefas'
    },
    {
        id: 'revisar-inteiro-teor',
        title: 'Revisar Inteiro Teor',
        type: 'basic',
        icon : 'heroicons_outline:chart-pie',
        link: '/revisar-inteiro-teor',
        queryParams: {
            id: 9,
        },
    },
    {
        id   :  'informar-o-redator',
        title:  'Informar o Redator',
        type :  'basic',
        icon :  'heroicons_outline:chart-pie',
        link :  '/informar-redator',
        queryParams: {
            processo: '9',
            colegiado: 'pleno',
        },
    },
    {
        id   :  'revisar-extrato-ata',
        title:  'Revisar o Extrato da Ata de Julgamento',
        type :  'basic',
        icon :  'heroicons_outline:chart-pie',
        link :  '/revisar-extrato-ata',
        queryParams: {
            id: 0
        },
    },
    {
        id   : 'finalizar-sessao-julgamento',
        title: '(Pós-Julgamento) Finalizar Sessao de Julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/finalizar-sessao-julgamento',
        queryParams: {
            numero: 1000,
            ano: 2021,
        },
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
    {
        id   : 'acervo',
        title: 'Acervo',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/acervo'
    },
    {
        id   : 'julgamento-extraordinario',
        title: 'Julgamento Extraordinario',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/julgamento-extraordinario'
    },
    {
        id   : 'sessao-extraordinaria',
        title: 'Solicitar Sessão Extraordinária',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/sessao-extraordinaria'
    },
    {
        id   : 'criacao-colegiado',
        title: 'Criação do Colegiado',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/criacao-colegiado',
        queryParams: {
            processo: 1,
            data: '2016-08-29T09%3A12%3A33.001Z',
            colegiado: 'pleno',
            sessao: '1000-2021',
        }
    },
    {
        id   : 'sessoes-julgamento',
        title: 'Sessões de Julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/sessoes-julgamento',
        queryParams: {
            numero: 1000,
            ano: 2021,
        }
    },
    {
        id   : 'resultado-julgamento',
        title: 'Resultado do Julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/resultado-julgamento',
        queryParams: {
            processo: '9',
            colegiado: 'pleno',
        },
    },
    {
        id: 'minhas-tarefas',
        title: 'Minhas tarefas',
        type: 'basic',
        icon : 'heroicons_outline:chart-pie',
        link: '/minhas-tarefas'
    },
    {
        id: 'revisar-inteiro-teor',
        title: 'Revisar Inteiro Teor',
        type: 'basic',
        icon : 'heroicons_outline:chart-pie',
        link: '/revisar-inteiro-teor',
        queryParams: {
            id: 9,
        },
    },
    {
        id   :  'informar-o-redator',
        title:  'Informar o Redator',
        type :  'basic',
        icon :  'heroicons_outline:chart-pie',
        link :  '/informar-redator',
        queryParams: {
            processo: '9',
            colegiado: 'pleno',
        },
    },
    {
        id   :  'revisar-extrato-ata',
        title:  'Revisar o Extrato da Ata de Julgamento',
        type :  'basic',
        icon :  'heroicons_outline:chart-pie',
        link :  '/revisar-extrato-ata',
        queryParams: {
            id: 0
        },
    },
    {
        id   : 'finalizar-sessao-julgamento',
        title: '(Pós-Julgamento) Finalizar Sessao de Julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/finalizar-sessao-julgamento',
        queryParams: {
            numero: 1000,
            ano: 2021,
        },
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
    {
        id   : 'acervo',
        title: 'Acervo',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/acervo'
    },
    {
        id   : 'julgamento-extraordinario',
        title: 'Julgamento Extraordinario',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/julgamento-extraordinario'
    },
    {
        id   : 'sessao-extraordinaria',
        title: 'Solicitar Sessão Extraordinária',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/sessao-extraordinaria'
    },
    {
        id   : 'criacao-colegiado',
        title: 'Criação do Colegiado',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/criacao-colegiado',
        queryParams: {
            processo: 1,
            data: '2016-08-29T09%3A12%3A33.001Z',
            colegiado: 'pleno',
            sessao: '1000-2021',
        }
    },
    {
        id   : 'sessoes-julgamento',
        title: 'Sessões de julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/sessoes-julgamento',
    },
    {
        id   : 'resultado-julgamento',
        title: 'Resultado do Julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/resultado-julgamento',
        queryParams: {
            processo: '9',
            colegiado: 'pleno',
        },
    },
    {
        id: 'minhas-tarefas',
        title: 'Minhas tarefas',
        type: 'basic',
        icon : 'heroicons_outline:chart-pie',
        link: '/minhas-tarefas'
    },
    {
        id: 'revisar-inteiro-teor',
        title: 'Revisar Inteiro Teor',
        type: 'basic',
        icon : 'heroicons_outline:chart-pie',
        link: '/revisar-inteiro-teor',
        queryParams: {
            id: 9,
        },
    },
    {
        id   :  'informar-o-redator',
        title:  'Informar o Redator',
        type :  'basic',
        icon :  'heroicons_outline:chart-pie',
        link :  '/informar-redator',
        queryParams: {
            processo: '9',
            colegiado: 'pleno',
        },
    },
    {
        id   :  'revisar-extrato-ata',
        title:  'Revisar o Extrato da Ata de Julgamento',
        type :  'basic',
        icon :  'heroicons_outline:chart-pie',
        link :  '/revisar-extrato-ata',
        queryParams: {
            id: 0
        },
    },
    {
        id   : 'finalizar-sessao-julgamento',
        title: '(Pós-Julgamento) Finalizar Sessao de Julgamento',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/finalizar-sessao-julgamento',
        queryParams: {
            numero: 1000,
            ano: 2021,
        },
    },
];
