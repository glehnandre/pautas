import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from 'app/modules/services/alerta.service';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { ProcessoService } from 'app/modules/services/processo.service';
import { Observable } from 'rxjs';
import { Processo } from '../../model/interfaces/processo.interface';
import { SessaoJulgamento } from '../../model/interfaces/sessao-julgamento.interface';
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

    //Deve recuperar o valor da Sessoes de Julgamento Integralmente para aquele ano por meio de serviço
    sessoes: SessaoJulgamento[] = [];

    processos: Processo[];

    myControl: FormControl = new FormControl();
    options: string[] = ['1000', '2000', '3000'];
    filteredOptions: Observable<string[]>;

    constructor(
        private _formBuilder: FormBuilder,
        private _dialog: MatDialog,
        private _julgamentoService: JulgamentoService,
        private _alertService: AlertaService,
        private _processoService: ProcessoService,
        private _route: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {
        // Create the form
        this.pautarForm = this._formBuilder.group({
            sessao: ['', [Validators.required]],
            colegiado: [''],
            modalidade: [''],
            data_inicio: [''],
            data_fim: [''],
        });
        this._julgamentoService.listarTodasAsSessoesDeJulgamento().subscribe(data=>{
            this.sessoes = data;
        });
        this._processoService.obterProcessosSelecionados()
            .subscribe(processos => this.processos = processos);
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
                    this._alertService.exibirAlertaDeSucesso();
                }
            });
        }
    }
    atualizaPautarForm(form: any){
        this.pautarForm.setValue(form);
    }
}
