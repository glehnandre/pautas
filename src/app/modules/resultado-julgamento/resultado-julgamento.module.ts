import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ResultadoJulgamentoComponent } from './resultado-julgamento.component';
import { MatButtonModule } from '@angular/material/button';

const ResultadoJulgamentoRoutes: Route[] = [
  {
    path: '',
    component: ResultadoJulgamentoComponent
  }
];

@NgModule({
  declarations: [
    ResultadoJulgamentoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ResultadoJulgamentoRoutes),
    MatButtonModule,
  ]
})
export class ResultadoJulgamentoModule { }
