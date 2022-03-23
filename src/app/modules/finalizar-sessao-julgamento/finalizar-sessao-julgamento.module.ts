import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

import { FormComponent } from './form/form.component';
import { ComposicaoComponent } from './composicao/composicao.component';
import { FinalizarSessaoJulgamentoComponent } from './finalizar-sessao-julgamento.component';

const FinalizarSessaoJulgamentoRoutes: Routes = [
  { path: '', component: FinalizarSessaoJulgamentoComponent },
];

@NgModule({
  declarations: [
    FinalizarSessaoJulgamentoComponent,
    ComposicaoComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FinalizarSessaoJulgamentoRoutes),
    MatChipsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDividerModule,
    FuseAlertModule,
    MatExpansionModule,
    SharedModule,
  ],
})
export class FinalizarSessaoJulgamentoModule { }
