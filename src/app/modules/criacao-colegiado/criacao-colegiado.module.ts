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
import { FuseMasonryModule } from '@fuse/components/masonry';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { FuseDrawerModule } from '@fuse/components/drawer';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';

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
    FuseMasonryModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    FuseAlertModule,
    FuseDrawerModule,
    SharedModule,
  ],
  exports: [
    CriacaoColegiadoComponent,
  ],
})
export class CriacaoColegiadoModule { }
