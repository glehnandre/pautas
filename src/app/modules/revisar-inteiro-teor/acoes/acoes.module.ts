import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { AcoesComponent } from './acoes.component';
import { IncluirDocumentoComponent } from './incluir-documento/incluir-documento.component';
import { FiltroModule } from './incluir-documento/filtros/filtro.module';
import { TabelaComponent } from './incluir-documento/tabela/tabela.component';

@NgModule({
  declarations: [
    AcoesComponent,
    IncluirDocumentoComponent,
    TabelaComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatButtonModule,
    FiltroModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  exports: [
      AcoesComponent,
  ]
})
export class AcoesModule { }
