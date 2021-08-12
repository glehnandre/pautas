import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessoesJulgamentoComponent } from './sessoes-julgamento.component';
import { Route, RouterModule } from '@angular/router';

const SessoesJulgamentoRoutes: Route[] = [
  { path: '', component: SessoesJulgamentoComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    SessoesJulgamentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SessoesJulgamentoRoutes),

  ]
})
export class SessoesJulgamentoModule { }
