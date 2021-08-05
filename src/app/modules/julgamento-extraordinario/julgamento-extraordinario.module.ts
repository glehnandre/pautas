import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JulgamentoExtraordinarioComponent } from './julgamento-extraordinario.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    JulgamentoExtraordinarioComponent,
  ]
})
export class JulgamentoExtraordinarioModule { }
