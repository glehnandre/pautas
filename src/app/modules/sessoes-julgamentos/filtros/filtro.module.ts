import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { FiltroDialogComponent } from './filtro-dialog.component';
import { FiltroComponent } from './filtro.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component'


const routes = [
  {
    path: 'filtro',
    component: FiltroComponent,
    FiltroDialogComponent
  }
];

@NgModule({
  declarations: [
    FiltroComponent,
    FiltroDialogComponent,
    ExpansionPanelComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule,
    ScrollingModule
  ],
  exports: [
    FiltroComponent
  ],
  providers:[

  ]
})
export class FiltroModule { }
