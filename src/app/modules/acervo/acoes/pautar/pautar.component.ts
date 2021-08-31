import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaService } from 'app/modules/services/alerta.service';
import { JulgamentoService } from 'app/modules/services/julgamento.service';
import { Observable } from 'rxjs';
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

    //O valor do colegiado é a própria string Primeira Turma e assim por diante.
    colegiados: Colegiado[] = [
        { value: 'primeira-turma', viewValue: 'Primeira Turma' },
        { value: 'segunda-turma', viewValue: 'Segunda Turma' },
        { value: 'colegiado-pleno', viewValue: 'Pleno' }
    ];

    modalidades = [
        {value: 'Virtual'},
        {value: 'Presencial'}
    ];

    //Deve recuperar o valor da Sessoes de Julgamento Integralmente para aquele ano por meio de serviço
    sessoes: SessaoJulgamento[] = [];

    modalidadeEscolhida = this.modalidades[0].value;
    colegiadoEscolhido = this.colegiados[0].viewValue;
    myControl: FormControl = new FormControl();
    options: string[] = ['1000', '2000', '3000'];
    filteredOptions: Observable<string[]>;

    constructor(
        public matDialogRef: MatDialogRef<PautarComponent>,
        private _formBuilder: FormBuilder,
        private _dialog: MatDialog,
        private _julgamentoService: JulgamentoService,
        private _alertService: AlertaService,
        @Inject(MAT_DIALOG_DATA) public data: any,
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
        })
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
}
