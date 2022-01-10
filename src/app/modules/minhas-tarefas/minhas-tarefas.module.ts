import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { MinhasTarefasComponent } from './minhas-tarefas.component';
import { CriacaoColegiadoComponent } from '../criacao-colegiado/criacao-colegiado.component';
import { FuseCardModule } from '@fuse/components/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltrosComponent } from './filtros/filtros.component';
import { ListaDeTaferasComponent } from './lista-de-taferas/lista-de-taferas.component';
import { MatListModule } from '@angular/material/list';

const minhasTarefasRoutes: Route[] = [
    {
        path     : '',
        component: MinhasTarefasComponent,
        children: [
            {
                path: 'colegiado',
                component: CriacaoColegiadoComponent,
            }
        ],
    }
];

@NgModule({
  declarations: [
    MinhasTarefasComponent,
    FiltrosComponent,
    ListaDeTaferasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    FuseNavigationModule,
    FuseCardModule,
    RouterModule.forChild(minhasTarefasRoutes),
    MatListModule,
  ]
})
export class MinhasTarefasModule { }
