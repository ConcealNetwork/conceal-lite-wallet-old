// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// NG Translate
import { TranslateModule } from '@ngx-translate/core';

// Directives
import { WebviewDirective } from './directives/';

// Compoents
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [WebviewDirective, LoaderComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, LoaderComponent]
})
export class SharedModule {}
