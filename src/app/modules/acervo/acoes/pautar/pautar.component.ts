import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
import { Observable } from 'rxjs';
import { Processo } from '../../tabela/tabela.component';
import { SessaoExtraordinariaComponent } from './sessao-extraordinaria/sessao-extraordinaria.component';
import { SessaoJulgamento } from './sessaoJulgamento';
import { ProcessoService } from 'app/modules/services/processo.service';

interface Colegiado {
    value: string;
    viewValue: string;
}

export interface Pauta {
    data_inicio: string;
    data_fim: string;
    assunto: string;
    colegiado: string;
    pautas: Processo[],
}

//remover julgamento. O correto é sessao de julgamento. A interface que está separada do código sessaoJulgamento.ts
export interface Julgamento {
    numero: number;
    ano: number;
    colegiado: string;
    tipo: string;
    categoria: string;
    modalidade: string;
    data_inicio: string;
    data_fim: string;
    secretario: {
        id: number;
        nome: string;
    };
}

@Component({
    selector: 'app-pautar',
    templateUrl: './pautar.component.html',
    styleUrls: ['./pautar.component.scss'],
})
export class PautarComponent implements OnInit {

    pautarForm: FormGroup;

    //O valor do colegiado é a própria string Primeira Turma e assim por diante.
    colegiados: Colegiado[] = [
        { value: 'primeira-turma', viewValue: 'Primeira Turma' },
        { value: 'segunda-turma', viewValue: 'Segunda Turma' },
        { value: 'colegiado-pleno', viewValue: 'Pleno' }
    ];

    //Deve recuperar o valor da Sessoes de Julgamento Integralmente para aquele ano por meio de serviço
    sessoes: SessaoJulgamento[] = [
        {id: 1, ano: 2021, numero: 1, colegiado: 'Primeira Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 1), data_fim: new Date(2021, 7, 5)},
        {id: 2, ano: 2021, numero: 2, colegiado: 'Primeira Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 6), data_fim: new Date(2021, 7, 11)},
        {id: 3, ano: 2021, numero: 3, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 13), data_fim: new Date(2021, 7, 18)},
        {id: 4, ano: 2021, numero: 4, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 20), data_fim: new Date(2021, 7, 25)},
        {id: 5, ano: 2021, numero: 5, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 7, 27), data_fim: new Date(2021, 8, 3)},
        {id: 6, ano: 2021, numero: 6, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 5), data_fim: new Date(2021, 8, 10)},
        {id: 7, ano: 2021, numero: 7, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 12), data_fim: new Date(2021, 8, 17)},
        {id: 8, ano: 2021, numero: 8, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 12), data_fim: new Date(2021, 8, 17)},
        {id: 9, ano: 2021, numero: 9, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 12), data_fim: new Date(2021, 8, 17)},
        {id: 10, ano: 2021, numero: 10, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: new Date(2021, 8, 20), data_fim: new Date(2021, 8, 25)}
    ];


    colegiadoEscolhido = this.colegiados[0].value;
    myControl: FormControl = new FormControl();
    options: string[] = ['1000', '2000', '3000'];
    filteredOptions: Observable<string[]>;

    constructor(
        public matDialogRef: MatDialogRef<PautarComponent>,
        private _formBuilder: FormBuilder,
        private _dialog: MatDialog,
        private _httpClient: HttpClient,
        private _fuseAlertService: FuseAlertService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _processoService: ProcessoService,
    ) {

    }
    
    ngOnInit(): void {
        // Create the form
        this.pautarForm = this._formBuilder.group({
            sessao: ['', [Validators.required]],
            colegiado: [''],
            data_inicio: [''],
            data_fim: [''],
        });
    }
    
    fechar(): void {
        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    sessaoExtraordinaria(): void {
        const dialogRef = this._dialog.open(SessaoExtraordinariaComponent, {});

        dialogRef.afterClosed().subscribe(resultado => {
            
        });
    }


    /**
     * Send the message
     */
    pautar(): void {
        if (this.pautarForm.valid) {
            this._httpClient.post('julgamentos', this.pautarForm.value as Julgamento)
                .subscribe({
                    next: (data) => {
                        console.log(data)
                        this._fuseAlertService.show('sucesso');
                        setTimeout(() => {
                            this._fuseAlertService.dismiss('sucesso');
                        }, 5000);
                    }   
                });
        }
    }

    removeChip(processo: Processo){
        this.data.processos.splice(this.data.processos.indexOf(processo), 1);
        this._processoService.desmarcarProcesso(processo);

        if(this.data.processos.length == 0){
            this.fechar();
        }
    }
}
