import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SharedModule } from '../../shared/shared.module';
import { SessoesJulgamentoComponent } from './sessoes-julgamento.component';

const SessoesJulgamentoRoutes: Route[] = [
  { path: '', component: SessoesJulgamentoComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    SessoesJulgamentoComponent,
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    SharedModule,
    FuseCardModule,
    FuseAlertModule,
    FuseDrawerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(SessoesJulgamentoRoutes),
    MatTableModule
  ],
})
export class SessoesJulgamentoModule { }
