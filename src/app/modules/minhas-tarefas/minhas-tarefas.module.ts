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
import { MatListModule } from '@angular/material/list';
import { TabelaComponent } from './tabela/tabela.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CarrosselChipsComponent } from './carrossel-chips/carrossel-chips.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FiltrarTagPorTipoPipe } from './filtros/filtrar-tag-por-tipo.pipe';

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
    TabelaComponent,
    CarrosselChipsComponent,
    FiltrarTagPorTipoPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(minhasTarefasRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    FuseNavigationModule,
    FuseCardModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatRippleModule,
    MatSelectModule,
    MatPaginatorModule,
    SharedModule,
  ]
})
export class MinhasTarefasModule { }
