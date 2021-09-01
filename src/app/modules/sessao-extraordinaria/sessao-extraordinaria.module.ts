import { LOCALE_ID, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessaoExtraordinariaComponent } from './sessao-extraordinaria.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { FuseAlertModule } from '@fuse/components/alert';
import { FormsModule } from '@angular/forms';

const sessaoExtraordinariaRoutes: Route[] = [
  {
      path     : '',
      component: SessaoExtraordinariaComponent
  }
];

@NgModule({
  declarations: [
    SessaoExtraordinariaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(sessaoExtraordinariaRoutes),
    FormsModule,
    MatChipsModule,
    MatButtonModule,
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
