import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JulgamentoExtraordinarioComponent } from './julgamento-extraordinario.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FuseCardModule } from '@fuse/components/card';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';

registerLocaleData(localePt);

const JulgamentoExtraordinarioRoutes: Route[] = [
  { path: '', component: JulgamentoExtraordinarioComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    JulgamentoExtraordinarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(JulgamentoExtraordinarioRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    FuseCardModule,
    MatSelectModule,
    SharedModule,
  ],
  exports: [
    JulgamentoExtraordinarioComponent,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ],
})
export class JulgamentoExtraordinarioModule { }
