import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FiltroModule } from './incluir-documento/filtros/filtro.module';
import { SharedModule } from 'app/shared/shared.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AcoesComponent } from './acoes.component';
import { TabelaComponent } from './incluir-documento/tabela/tabela.component';
import { IncluirDocumentoComponent } from './incluir-documento/incluir-documento.component';

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
    MatTableModule,
    FiltroModule,
    SharedModule,
  ],
  providers: [
    { 
      provide: MAT_DATE_LOCALE, 
      useValue: 'pt-BR' 
    }
  ],
  exports: [
      AcoesComponent,
  ]
})
export class AcoesModule { }
