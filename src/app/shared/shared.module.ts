import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProcessoChipComponent } from './processo-chip/processo-chip.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ProcessoPainelExpansivoComponent } from './processo-painel-expansivo/processo-painel-expansivo.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProcessoCapituloComponent } from './processo-capitulo/processo-capitulo.component';
import { PautarFormComponent } from './pautar-form/pautar-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SessoesPipe } from './pautar-form/sessoes.pipe';
import { CarrosselComponent } from './carrossel/carrossel.component';


@NgModule({
    declarations: [
        ProcessoChipComponent,
        ProcessoPainelExpansivoComponent,
        ProcessoCapituloComponent,
        PautarFormComponent,
        SessoesPipe,
        CarrosselComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatIconModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSelectModule,
        MatRadioModule,
        MatAutocompleteModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProcessoChipComponent,
        ProcessoPainelExpansivoComponent,
        ProcessoCapituloComponent,
        PautarFormComponent,
        CarrosselComponent,
    ],
})
export class SharedModule
{
}
