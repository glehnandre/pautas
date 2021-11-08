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
import { CabecalhoRelatorComponent } from './cabecalho-relator/cabecalho-relator.component';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatButtonModule } from '@angular/material/button';
import { VisualizadorPdfComponent } from './visualizador-pdf/visualizador-pdf.component';
import { CarrosselComponent } from './carrossel/carrossel.component';
import { ProcessosSolicitacaoExtraordinariaComponent } from './processos-solicitacao-extraordinaria/processos-solicitacao-extraordinaria.component';
import { ContadorComponent } from './contador/contador.component';
import { FuseCardModule } from '@fuse/components/card';
import { MatDividerModule } from '@angular/material/divider';
import { MinistrosQueAcompanharamComponent } from './ministros-que-acompanharam/ministros-que-acompanharam.component';
import { IconesVotosComponent } from './icones-votos/icones-votos.component';


@NgModule({
    declarations: [
        ProcessoChipComponent,
        ProcessoPainelExpansivoComponent,
        ProcessoCapituloComponent,
        ProcessosSolicitacaoExtraordinariaComponent,
        PautarFormComponent,
        SessoesPipe,
        CarrosselComponent,
        CabecalhoRelatorComponent,
        VisualizadorPdfComponent,
        ContadorComponent,
        MinistrosQueAcompanharamComponent,
        IconesVotosComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatChipsModule,
        MatDividerModule,
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
        FuseDrawerModule,
        FuseCardModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProcessoChipComponent,
        ProcessoPainelExpansivoComponent,
        ProcessoCapituloComponent,
        ProcessosSolicitacaoExtraordinariaComponent,
        PautarFormComponent,
        CarrosselComponent,
        CabecalhoRelatorComponent,
        VisualizadorPdfComponent,
        ContadorComponent,
        MinistrosQueAcompanharamComponent,
        IconesVotosComponent,
    ],
})
export class SharedModule
{
}
