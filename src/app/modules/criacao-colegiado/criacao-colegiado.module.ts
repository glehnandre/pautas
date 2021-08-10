import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CriacaoColegiadoComponent } from './criacao-colegiado.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

const CriacaoColegiadoRoutes: Routes = [
  { path: '', component: CriacaoColegiadoComponent },
];

@NgModule({
  declarations: [
    CriacaoColegiadoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CriacaoColegiadoRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [
    CriacaoColegiadoComponent,
  ],
})
export class CriacaoColegiadoModule { }
