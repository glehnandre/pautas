import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CriacaoColegiadoComponent } from './criacao-colegiado.component';

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
  ],
  exports: [
    CriacaoColegiadoComponent,
  ],
})
export class CriacaoColegiadoModule { }
