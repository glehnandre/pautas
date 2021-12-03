import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseDrawerModule } from '@fuse/components/drawer/drawer.module';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ResultadoJulgamentoComponent } from './resultado-julgamento.component';
import { ConteudoVotoMinistroComponent } from './conteudo-voto-ministro/conteudo-voto-ministro.component';
import { FormDecisaoComponent } from './form-decisao/form-decisao.component';
import { AplicarDecisoesComponent } from './aplicar-decisoes/aplicar-decisoes.component';
import { VotoDosMinistrosComponent } from './voto-dos-ministros/voto-dos-ministros.component';
import { FormModeloDecisaoComponent } from './form-modelo-decisao/form-modelo-decisao.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormVistaEDestaqueComponent } from './form-vista-e-destaque/form-vista-e-destaque.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FuseAlertModule } from '@fuse/components/alert';
import { FormRelatorComponent } from './form-relator/form-relator.component';

const ResultadoJulgamentoRoutes: Route[] = [
  {
    path: '',
    component: ResultadoJulgamentoComponent
  }
];

@NgModule({
  declarations: [
    ResultadoJulgamentoComponent,
    ConteudoVotoMinistroComponent,
    FormDecisaoComponent,
    AplicarDecisoesComponent,
    VotoDosMinistrosComponent,
    FormModeloDecisaoComponent,
    FormVistaEDestaqueComponent,
    FormRelatorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ResultadoJulgamentoRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    FuseCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    FuseDrawerModule,
    MatListModule,
    MatRippleModule,
    DragDropModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    FuseAlertModule,
  ]
})
export class ResultadoJulgamentoModule { }
