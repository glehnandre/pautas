import { LOCALE_ID, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseAlertModule } from '@fuse/components/alert';
import { FormsModule } from '@angular/forms';

import { FormRespostaComponent } from './form-resposta/form-resposta.component';
import { SessaoExtraordinariaComponent } from './sessao-extraordinaria.component';

const sessaoExtraordinariaRoutes: Route[] = [
  {
      path     : '',
      component: SessaoExtraordinariaComponent
  }
];

@NgModule({
  declarations: [
    SessaoExtraordinariaComponent,
    FormRespostaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(sessaoExtraordinariaRoutes),
    FormsModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    SharedModule,
    FuseAlertModule
  ],
  exports: [
    SessaoExtraordinariaComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
   ]
})
export class SessaoExtraordinariaModule { }
