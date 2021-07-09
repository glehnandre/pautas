import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './tabela.component';
import { RouterModule } from '@angular/router';
import { LinhaComponent } from './linha/linha.component';
import { NomeComponent } from './nome/nome.component'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ClasseComponent } from './classe/classe.component';
import { DescricaoComponent } from './descricao/descricao.component';
import { StatusComponent } from './status/status.component';
import { TagsComponent } from './tags/tags.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CapitulosComponent } from './capitulos/capitulos.component';

import { MatChipsModule } from '@angular/material/chips';
import { AcoesModule } from '../acoes/acoes.module';

const routes = [
  {
    path: 'tabela',
    component: TabelaComponent
  }
];

@NgModule({
  declarations: [
    TabelaComponent,
    LinhaComponent,
    NomeComponent,
    ClasseComponent,
    DescricaoComponent,
    StatusComponent,
    TagsComponent,
    CapitulosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatIconModule,
    MatGridListModule,
    MatExpansionModule,
    AcoesModule,
    MatChipsModule
  ],
  exports: [
    TabelaComponent
  ]
})
export class TabelaModule { }
