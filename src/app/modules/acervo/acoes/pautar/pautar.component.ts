import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
import { AlertaService } from 'app/modules/services/alerta.service';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Observable } from 'rxjs';
import { Processo } from '../../model/interfaces/processo.interface';
import { SessaoJulgamento } from '../../model/interfaces/sessao-julgamento';
import { SessaoExtraordinariaComponent } from './sessao-extraordinaria/sessao-extraordinaria.component';


export interface Colegiado {
    value: string;
    viewValue: string;
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
        { ano: 2021, numero: 1, colegiado: 'Primeira Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-06-29T09:12:33.001Z', data_fim: '2021-12-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 2, colegiado: 'Primeira Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-06-29T09:12:33.001Z', data_fim: '2021-12-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 3, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-04-29T09:12:33.001Z', data_fim: '2021-11-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 4, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-04-29T09:12:33.001Z', data_fim: '2021-11-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 5, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-03-29T09:12:33.001Z', data_fim: '2021-10-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 6, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-03-29T09:12:33.001Z', data_fim: '2021-10-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 7, colegiado: 'Segunda Turma', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-03-29T09:12:33.001Z', data_fim: '2021-10-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 8, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-07-29T09:12:33.001Z', data_fim: '2021-10-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 9, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-01-29T09:12:33.001Z', data_fim: '2021-12-29T09:12:33.001Z', situacao: 'ABERTA'},
        { ano: 2021, numero: 10, colegiado: 'Pleno', modalidade: 'Virtual', categoria: 'Judicial', tipo: 'Ordinária', data_inicio: '2021-09-29T09:12:33.001Z', data_fim: '2021-12-29T09:12:33.001Z', situacao: 'ABERTA'}
    ];

    colegiadoEscolhido = this.colegiados[0].value;
    myControl: FormControl = new FormControl();
    options: string[] = ['1000', '2000', '3000'];
    filteredOptions: Observable<string[]>;

    constructor(
        public matDialogRef: MatDialogRef<PautarComponent>,
        private _formBuilder: FormBuilder,
        private _dialog: MatDialog,
        private _julgamentoService: JulgamentoService,
        private _fuseAlertService: FuseAlertService,
        private _processoService: ProcessoService,
        private _alertService: AlertaService,
        @Inject(MAT_DIALOG_DATA) public data: any,
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

    sessaoExtraordinaria(): void {
        const dialogRef = this._dialog.open(SessaoExtraordinariaComponent, {});

        dialogRef.afterClosed().subscribe(resultado => {
            
        });
    }

    pautar(): void {
        if (this.pautarForm.valid) {
            this._julgamentoService.pautarProcesso(this.pautarForm.value).subscribe({
                next: (data) => {
                    console.log(data)
                    this._alertService.exibirAlertaDeSucesso();
                }   
            });   
        }
    }

    removeChip(processo: Processo){
        this.data.processos.splice(this.data.processos.indexOf(processo), 1);
        processo.checked = false;
        this._processoService.setProcessosSelecionados(this.data.processos);

        if(this.data.processos.length == 0){
            this.fechar();
        }
    }
}
