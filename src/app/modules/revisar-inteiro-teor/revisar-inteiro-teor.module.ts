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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const revisarInteiroTeorRoutes: Route[] = [
    {
        path     : '',
        component: RevisarInteiroTeorComponent,
    }
];


@NgModule({
  declarations: [
    RevisarInteiroTeorComponent,
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
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class RevisarInteiroTeorModule { }