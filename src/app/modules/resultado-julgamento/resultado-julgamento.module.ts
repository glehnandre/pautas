import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseDrawerModule } from '@fuse/components/drawer/drawer.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from 'app/shared/shared.module';
import { AplicarDecisoesComponent } from './aplicar-decisoes/aplicar-decisoes.component';
import { ChipsComponent } from './chips/chips.component';
import { ConteudoVotoMinistroComponent } from './conteudo-voto-ministro/conteudo-voto-ministro.component';
import { FormDecisaoComponent } from './form-decisao/form-decisao.component';
import { FormIndicacaoImpedimentosComponent } from './form-indicacao-impedimentos/form-indicacao-impedimentos.component';
import { FormModeloDecisaoComponent } from './form-modelo-decisao/form-modelo-decisao.component';
import { FormRelatorComponent } from './form-relator/form-relator.component';
import { FormVistaEDestaqueComponent } from './form-vista-e-destaque/form-vista-e-destaque.component';
import { ResultadoJulgamentoComponent } from './resultado-julgamento.component';
import { VotoDosMinistrosComponent } from './voto-dos-ministros/voto-dos-ministros.component';
import { FormSuspensaoComponent } from './form-suspensao/form-suspensao.component';
import { OrdenarPipe } from './ordenar.pipe';


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
    FormIndicacaoImpedimentosComponent,
    ChipsComponent,
    FormSuspensaoComponent,
    OrdenarPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ResultadoJulgamentoRoutes),
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    EditorModule,
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
    MatRadioModule,
  ]
})
export class ResultadoJulgamentoModule { }
