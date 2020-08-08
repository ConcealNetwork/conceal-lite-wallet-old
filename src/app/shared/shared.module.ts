// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

// 3rd Party
import { QRCodeModule } from 'angularx-qrcode';
import { NgPipesModule } from 'ngx-pipes';

// Directives
import { WebviewDirective } from './directives/webview.directive';
import { ParticlesDirective } from './directives/particles.directive';

// Components
import { LoaderComponent } from './components/loader/loader.component';
import { BackgroundComponent } from './components/background/background.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Dialog Components
import { ExportKeysDialog } from './components/dialogs/dashboard/export.dialog';
import { ImportKeysDialog } from './components/dialogs/dashboard/import.dialog';
import { QrCodeDialog } from './components/dialogs/dashboard/code.dialog';
import { NewMessageDialog } from './components/dialogs/messages/new.message.dialog';
import { NewContactDialog } from './components/dialogs/contacts/new.contact.dialog';
import { BankingDialog } from './components/dialogs/banking/banking.dialog';
import { TransferDialog } from './components/dialogs/transfer/transfer.dialog';

@NgModule({
  declarations: [
    WebviewDirective,
    ParticlesDirective,
    LoaderComponent,
    BackgroundComponent,
    HeaderComponent,
		FooterComponent,
		ExportKeysDialog,
		ImportKeysDialog,
		QrCodeDialog,
		NewMessageDialog,
		NewContactDialog,
		BankingDialog,
		TransferDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    TranslateModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
    A11yModule,
    LayoutModule,
    ObserversModule,
    OverlayModule,
    PortalModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatInputModule,
		MatSlideToggleModule,
		MatSelectModule,
		MatDialogModule,
		MatTooltipModule,
		QRCodeModule,
		NgPipesModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    ParticlesDirective,
    LoaderComponent,
    BackgroundComponent,
    HeaderComponent,
		FooterComponent
	],
	providers :[],
	entryComponents: [],
})

export class SharedModule {}
