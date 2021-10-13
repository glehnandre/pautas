import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { PublicacoesComponent } from './publicacoes.component';


const PublicacoesRoutes: Routes = [
  { path: '', component: PublicacoesComponent },
];

@NgModule({
  declarations: [
    PublicacoesComponent
  ],
  imports: [
    CommonModule,
    EmptyLayoutModule,
    RouterModule.forChild(PublicacoesRoutes),
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[
    PublicacoesComponent
  ]
})
export class PublicacoesModule { }
