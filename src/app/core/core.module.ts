// Angular Core
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Modules
import { SharedModule } from '../shared/shared.module';

// Directives
import { ParticlesDirective } from './../shared/directives/particles.directive'

// Components
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShellComponent,
    ParticlesDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: []
})
export class CoreModule { }
