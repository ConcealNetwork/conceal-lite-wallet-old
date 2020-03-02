// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// NG Translate
import { TranslateModule } from '@ngx-translate/core';

// Angular Material
import { A11yModule } from '@angular/cdk/a11y';
import { LayoutModule } from '@angular/cdk/layout';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Directives
import { WebviewDirective } from './directives/webview.directive';
import { ParticlesDirective } from './directives/particles.directive';

// Components
import { LoaderComponent } from './components/loader/loader.component';
import { BackgroundComponent } from './components/background/background.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    WebviewDirective,
    ParticlesDirective,
    LoaderComponent,
    BackgroundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    A11yModule,
    LayoutModule,
    ObserversModule,
    OverlayModule,
    PortalModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    ParticlesDirective,
    FormsModule,
    LoaderComponent,
    BackgroundComponent,
    HeaderComponent,
    FooterComponent
  ]
})

export class SharedModule {}
