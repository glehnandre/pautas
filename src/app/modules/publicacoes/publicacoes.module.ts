import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { FuseNavigationModule } from '@fuse/components/navigation/navigation.module';
import { FuseCardModule } from '@fuse/components/card';

import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { PublicacoesComponent } from './publicacoes.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { TextosComponent } from './textos/textos.component';



const PublicacoesRoutes: Routes = [
  { path: '', component: PublicacoesComponent },
];

@NgModule({
  declarations: [
    PublicacoesComponent,
    FiltrosComponent,
    TextosComponent
  ],
  imports: [
    CommonModule,
    EmptyLayoutModule,
    RouterModule.forChild(PublicacoesRoutes),
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    FuseNavigationModule,
    MatCheckboxModule,
    FuseCardModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    PublicacoesComponent
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class PublicacoesModule { }
