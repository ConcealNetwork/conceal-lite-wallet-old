import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';

import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [WebviewDirective, LoaderComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, LoaderComponent]
})
export class SharedModule {}
