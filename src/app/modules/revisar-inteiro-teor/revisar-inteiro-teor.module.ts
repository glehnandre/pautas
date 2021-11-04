import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RevisarInteiroTeorComponent } from './revisar-inteiro-teor.component';

const revisarInteiroTeorRoutes: Route[] = [
    {
        path     : '',
        component: RevisarInteiroTeorComponent,
    }
];


@NgModule({
  declarations: [
    RevisarInteiroTeorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(revisarInteiroTeorRoutes),
  ]
})
export class RevisarInteiroTeorModule { }
