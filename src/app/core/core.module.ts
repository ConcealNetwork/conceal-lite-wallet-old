// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from '../shared/shared.module';

// Directives
import { ParticlesDirective } from './../shared/directives/particles.directive'

// Components
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShellComponent,
    ParticlesDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: []
})
export class CoreModule { }
