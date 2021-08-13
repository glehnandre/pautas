import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CriacaoColegiadoComponent } from './criacao-colegiado.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FuseCardModule } from '@fuse/components/card';
import { CardMinistroComponent } from './card-ministro/card-ministro.component';

const CriacaoColegiadoRoutes: Routes = [
  { path: '', component: CriacaoColegiadoComponent },
];

@NgModule({
  declarations: [
    CriacaoColegiadoComponent,
    CardMinistroComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CriacaoColegiadoRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    FuseCardModule,
  ],
  exports: [
    CriacaoColegiadoComponent,
  ],
})
export class CriacaoColegiadoModule { }
