import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SessoesJulgamentosComponent } from './sessoes-julgamentos.component';
import { FiltroModule } from './filtros/filtro.module';
import { SharedModule } from '../../shared/shared.module';
import { ContadorComponent } from './contador/contador.component';
import { FuseCardModule } from '@fuse/components/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ImpedimentoComponent } from './impedimento/impedimento.component';
import { FuseDrawerModule } from '@fuse/components/drawer';

const SessoesJulgamentoRoutes: Route[] = [
  { path: '', component: SessoesJulgamentosComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    SessoesJulgamentosComponent,
    ContadorComponent,
    ImpedimentoComponent,
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    FiltroModule,
    SharedModule,
    FuseCardModule,
    MatDialogModule,
    FuseDrawerModule,
    RouterModule.forChild(SessoesJulgamentoRoutes),
  ]
})
export class SessoesJulgamentosModule { }
