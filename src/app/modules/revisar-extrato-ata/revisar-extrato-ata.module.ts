import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisarExtratoAtaComponent } from './revisar-extrato-ata.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StackedBarProcessosComponent } from './stacked-bar-processos/stacked-bar-processos.component';

const RevisarExtratoAtaRoute: Routes = [
    { path: '', component: RevisarExtratoAtaComponent}
];

@NgModule({
  declarations: [
    RevisarExtratoAtaComponent,
    StackedBarProcessosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RevisarExtratoAtaRoute),
    SharedModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  exports: [
      RevisarExtratoAtaComponent,
  ]
})
export class RevisarExtratoAtaModule { }
