import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformarRedatorComponent } from './informar-redator.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FuseCardModule } from '@fuse/components/card';
import { MatTabsModule } from '@angular/material/tabs';

const InformarRedatorRoutes: Routes = [
    { path: '', component: InformarRedatorComponent }
]

@NgModule({
  declarations: [
    InformarRedatorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(InformarRedatorRoutes),
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [
      InformarRedatorComponent,
  ]
})
export class InformarRedatorModule { }
