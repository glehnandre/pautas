import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcoesComponent } from './acoes.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseAlertModule } from '@fuse/components/alert';

import { AgruparEmlistaComponent } from './agrupar-emlista/agrupar-emlista.component';
import { NovaListaComponent } from './agrupar-emlista/nova-lista/nova-lista.component';
import { GerenciarListasComponent } from './agrupar-emlista/gerenciar-listas/gerenciar-listas.component';
import { PautarComponent } from './pautar/pautar.component';
import { SessaoExtraordinariaComponent } from './pautar/sessao-extraordinaria/sessao-extraordinaria.component';
import { AlertaComponent } from './agrupar-emlista/gerenciar-listas/alerta/alerta.component';
import { ReanalizarComponent } from './reanalizar/reanalizar.component';
import { AlterarSessaoComponent } from './alterar-sessao/alterar-sessao.component';
import { SharedModule } from 'app/shared/shared.module';

const routes = [
  {
    path: 'acoes',
    component: AcoesComponent
  },
  {
    path: 'pautar',
    component: PautarComponent,
  },
];

@NgModule({
  declarations: [
    AcoesComponent,
    AgruparEmlistaComponent,
    NovaListaComponent,
    GerenciarListasComponent,
    PautarComponent,
    SessaoExtraordinariaComponent,
    AlertaComponent,
    ReanalizarComponent,
    AlterarSessaoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FuseAlertModule,
    SharedModule,
  ],
  exports: [
    AcoesComponent,
  ]
})
export class AcoesModule { }
