import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RevisarInteiroTeorComponent } from './revisar-inteiro-teor.component';
import { SharedModule } from '../../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { DadosDaSessaoComponent } from './dados-da-sessao/dados-da-sessao.component';

const revisarInteiroTeorRoutes: Route[] = [
    {
        path     : '',
        component: RevisarInteiroTeorComponent,
    }
];


@NgModule({
  declarations: [
    RevisarInteiroTeorComponent,
    DadosDaSessaoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(revisarInteiroTeorRoutes),
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
  ]
})
export class RevisarInteiroTeorModule { }
