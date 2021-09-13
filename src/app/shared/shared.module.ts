import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessoChipComponent } from './processo-chip/processo-chip.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ProcessoPainelExpansivoComponent } from './processo-painel-expansivo/processo-painel-expansivo.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CabecalhoRelatorComponent } from './cabecalho-relator/cabecalho-relator.component';
import { CarrosselComponent } from 'app/shared/cabecalho-relator/carrossel/carrossel.component';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatButtonModule } from '@angular/material/button';
import { VisualizadorPdfComponent } from './visualizador-pdf/visualizador-pdf.component';

@NgModule({
    declarations: [
        ProcessoChipComponent,
        ProcessoPainelExpansivoComponent,
        CabecalhoRelatorComponent,
        CarrosselComponent,
        VisualizadorPdfComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatExpansionModule,
        FuseDrawerModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProcessoChipComponent,
        ProcessoPainelExpansivoComponent,
        CarrosselComponent,
        CabecalhoRelatorComponent,
        VisualizadorPdfComponent,
    ],
})
export class SharedModule
{
}
