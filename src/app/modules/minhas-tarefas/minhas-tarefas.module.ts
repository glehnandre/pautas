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
    MinhasTarefasComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    FuseNavigationModule,
    RouterModule.forChild(minhasTarefasRoutes),
  ]
})
export class MinhasTarefasModule { }
