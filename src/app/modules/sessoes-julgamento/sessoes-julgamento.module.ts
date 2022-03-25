import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SharedModule } from '../../shared/shared.module';
import { FiltrosComponent } from './filtros/filtros.component';
import { SessoesJulgamentoComponent } from './sessoes-julgamento.component';
import { TabelaComponent } from './tabela/tabela.component';


const SessoesJulgamentoRoutes: Route[] = [
  { path: '', component: SessoesJulgamentoComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    SessoesJulgamentoComponent,
    FiltrosComponent,
    TabelaComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
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
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
  ],
})
export class SessoesJulgamentoModule { }
