import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';

import { AcervoComponent } from './acervo.component';
import { TabelaModule } from './tabela/tabela.module';
import { FiltroModule } from './filtros/filtro.module';
import { AcoesModule } from './acoes/acoes.module';

const AcervoRoutes: Route[] = [
  {
    path: '',
    component: AcervoComponent
  }
];

@NgModule({
  declarations: [
    AcervoComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AcervoRoutes),
    FiltroModule,
    TabelaModule,
    AcoesModule,
    MatIconModule,
    EmptyLayoutModule,
  ],
  exports:[
    AcervoComponent
  ]
})
export class AcervoModule { }
