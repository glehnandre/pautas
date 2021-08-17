import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessoesJulgamentosComponent } from './sessoes-julgamentos.component';

const SessoesJulgamentoRoutes: Route[] = [
  { path: '', component: SessoesJulgamentosComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    SessoesJulgamentosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SessoesJulgamentoRoutes),
  ]
})
export class SessoesJulgamentosModule { }
