import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JulgamentoExtraordinarioComponent } from './julgamento-extraordinario.component';

const JulgamentoExtraordinarioRoutes: Route[] = [
  { path: '', component: JulgamentoExtraordinarioComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    JulgamentoExtraordinarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(JulgamentoExtraordinarioRoutes),
  ],
  exports: [
    JulgamentoExtraordinarioComponent,
  ]
})
export class JulgamentoExtraordinarioModule { }
