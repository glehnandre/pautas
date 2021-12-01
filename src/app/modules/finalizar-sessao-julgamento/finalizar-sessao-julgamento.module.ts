import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FinalizarSessaoJulgamentoComponent } from './finalizar-sessao-julgamento.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete'

const FinalizarSessaoJulgamentoRoutes: Routes = [
  { path: '', component: FinalizarSessaoJulgamentoComponent },
];

@NgModule({
  declarations: [
    FinalizarSessaoJulgamentoComponent,
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
  ],
  exports: [
    FinalizarSessaoJulgamentoComponent,
  ]
})
export class FinalizarSessaoJulgamentoModule { }
