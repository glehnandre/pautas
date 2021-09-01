import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProcessoChipComponent } from './processo-chip/processo-chip.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ProcessoPainelExpansivoComponent } from './processo-painel-expansivo/processo-painel-expansivo.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProcessoCapituloComponent } from './processo-capitulo/processo-capitulo.component';

@NgModule({
    declarations: [
        ProcessoChipComponent,
        ProcessoPainelExpansivoComponent,
        ProcessoCapituloComponent,
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
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProcessoChipComponent,
        ProcessoPainelExpansivoComponent,
        ProcessoCapituloComponent,
    ],
})
export class SharedModule
{
}
