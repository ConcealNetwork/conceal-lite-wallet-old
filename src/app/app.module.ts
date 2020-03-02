import 'reflect-metadata';
import '../polyfills';

// Anguler Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { MatCardModule } from '@angular/material/card';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Services 
import { DataService } from './shared/services/data.service';

// Compoents
import { AppComponent } from './app.component';
import { ActivityComponent } from './modules/activity/activity.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LockComponent } from './modules/lock/lock.component';
import { MessagingComponent } from './modules/messaging/messaging.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { TransferComponent } from './modules/transfer/transfer.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    ContactsComponent,
    DashboardComponent,
    LockComponent,
    MessagingComponent,
    SettingsComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    A11yModule,
    LayoutModule,
    ObserversModule,
    OverlayModule,
    PortalModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}
