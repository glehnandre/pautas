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
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AgruparEmlistaComponent } from './agrupar-emlista/agrupar-emlista.component';
import { NovaListaComponent } from './agrupar-emlista/nova-lista/nova-lista.component';
import { GerenciarListasComponent } from './agrupar-emlista/gerenciar-listas/gerenciar-listas.component';
import { PautarComponent } from './pautar/pautar.component';
import { SessaoExtraordinariaComponent } from './pautar/sessao-extraordinaria/sessao-extraordinaria.component';

const routes = [
  {
    path: 'acoes',
    component: AcoesComponent
  }
];

@NgModule({
  declarations: [
    AcoesComponent,
    AgruparEmlistaComponent,
    NovaListaComponent,
    GerenciarListasComponent,
    PautarComponent,
    SessaoExtraordinariaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
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
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  exports: [
    AcoesComponent,
  ]
})
export class AcoesModule { }
