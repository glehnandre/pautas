import { LOCALE_ID, NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessaoExtraordinariaComponent } from './sessao-extraordinaria.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';

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
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  exports: [
    SessaoExtraordinariaComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
   ]
})
export class SessaoExtraordinariaModule { }
