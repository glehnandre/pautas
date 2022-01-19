import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RevisarInteiroTeorComponent } from './revisar-inteiro-teor.component';
import { SharedModule } from '../../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseCardModule } from '@fuse/components/card';
import { TabelaComponent } from './tabela/tabela.component';
import { AcoesModule } from './acoes/acoes.module';
import { VisualizadorInteiroTeorComponent } from './visualizador-inteiro-teor/visualizador-inteiro-teor.component';
import { ConteudoPublicacaoComponent } from './conteudo-publicacao/conteudo-publicacao.component';

const revisarInteiroTeorRoutes: Route[] = [
    {
        path     : '',
        component: RevisarInteiroTeorComponent,
    }
];

@NgModule({
  declarations: [
    RevisarInteiroTeorComponent,
    TabelaComponent,
    VisualizadorInteiroTeorComponent,
    ConteudoPublicacaoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(revisarInteiroTeorRoutes),
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    FuseAlertModule,
    FuseDrawerModule,
    FuseCardModule,
    DragDropModule,
    AcoesModule
  ]
})
export class RevisarInteiroTeorModule { }
