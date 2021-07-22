
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseAlertService } from '@fuse/components/alert';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SessaoExtraordinariaComponent } from './sessao-extraordinaria/sessao-extraordinaria.component';

interface Colegiado {
    value: string;
    viewValue: string;
}

export interface Julgamento {
    sessao: number;
    colegiado: string;
    data_inicio: string;
    data_fim: string;
}

@Component({
    selector: 'app-pautar',
    templateUrl: './pautar.component.html',
    styleUrls: ['./pautar.component.scss'],
})
export class PautarComponent implements OnInit {
    pautarForm: FormGroup;
    selectedValue: string;
    colegiados: Colegiado[] = [
        { value: 'primeira-turma', viewValue: 'Primeira Turma' },
        { value: 'segunda-turma', viewValue: 'Segunda Turma' },
        { value: 'colegiado-pleno', viewValue: 'Pleno' }
    ];
    chosenItem = this.colegiados[0].value;
    myControl: FormControl = new FormControl();
    options: string[] = ['1000', '2000', '3000'];
    filteredOptions: Observable<string[]>;

    constructor(
        public matDialogRef: MatDialogRef<PautarComponent>,
        private _formBuilder: FormBuilder,
        private _dialog: MatDialog,
        private _httpClient: HttpClient,
        private _fuseAlertService: FuseAlertService,
    ) {

    }

    ngOnInit(): void {
        // Create the form
        this.pautarForm = this._formBuilder.group({
            sessao: [null, [Validators.required]],
            colegiado: [''],
            data_inicio: [''],
            data_fim: ['']
        });

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
}
