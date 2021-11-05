import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RevisarInteiroTeorComponent } from './revisar-inteiro-teor.component';
import { SharedModule } from '../../shared/shared.module';

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
    MatButtonModule,
    SharedModule,
    RouterModule.forChild(revisarInteiroTeorRoutes),
  ]
})
export class RevisarInteiroTeorModule { }
