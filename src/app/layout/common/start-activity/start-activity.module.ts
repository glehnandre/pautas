import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartActivityComponent } from './start-activity.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
      StartActivityComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
      StartActivityComponent
  ]
})
export class StartActivityModule { }
