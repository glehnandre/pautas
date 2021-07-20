
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SessaoExtraordinariaComponent } from './sessao-extraordinaria/sessao-extraordinaria.component';
interface Colegiado {
    value: string;
    viewValue: string;
}
@Component({
    selector: 'app-pautar',
    templateUrl: './pautar.component.html',
    styleUrls: ['./pautar.component.scss'],
})
export class PautarComponent implements OnInit {
    composeForm: FormGroup;
    selectedValue: string;
    colegiados: Colegiado[] = [
        { value: 'primeira-turma', viewValue: 'Primeira Turma' },
        { value: 'segunda-turma', viewValue: 'Segunda Turma' },
        { value: 'colegiado-pleno', viewValue: 'Pleno' }
    ];
    chosenItem = this.colegiados[0].value;
    myControl: FormControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    constructor(
        public matDialogRef: MatDialogRef<PautarComponent>,
        private _formBuilder: FormBuilder,
        private _dialog: MatDialog,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.composeForm = this._formBuilder.group({
            numero: ['', [Validators.required]],
            ano: ['', [Validators.required]],
            colegiado: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
            categoria: ['', [Validators.required]],
            modalidade: ['', [Validators.required]],
            data_inicio: ['', [Validators.required]],
            data_fim: ['', [Validators.required]],
            secretario: ['', [Validators.required]],
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Save and close
     */
    saveAndClose(): void {
        // Save the message as a draft
        this.saveAsDraft();

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void {
        const dialogRef = this._dialog.open(SessaoExtraordinariaComponent, {});

        dialogRef.afterClosed().subscribe(resultado => {
            
        });
    }

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void {

    }

    /**
     * Send the message
     */
    send(): void {
        console.log(this.composeForm.value)
    }
}
