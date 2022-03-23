import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { PublicarFormComponent } from './publicar-form/publicar-form.component';
import { RevisarExtratoAtaComponent } from './revisar-extrato-ata.component';
import { StackedBarProcessosComponent } from './stacked-bar-processos/stacked-bar-processos.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ExtratoAtaComponent } from './extrato-ata/extrato-ata.component';
import { CorrecaoCapituloFormComponent } from './correcao-capitulo-form/correcao-capitulo-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrdenarPipe } from './extrato-ata/ordenar.pipe';

const RevisarExtratoAtaRoute: Routes = [
    { path: '', component: RevisarExtratoAtaComponent}
];

@NgModule({
  declarations: [
    RevisarExtratoAtaComponent,
    StackedBarProcessosComponent,
    PublicarFormComponent,
    ExtratoAtaComponent,
    CorrecaoCapituloFormComponent,
    OrdenarPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RevisarExtratoAtaRoute),
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [
      RevisarExtratoAtaComponent,
  ]
})
export class RevisarExtratoAtaModule { }
