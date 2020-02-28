// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { TransferRoutingModule } from './transfer-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { TransferComponent } from './transfer.component';

@NgModule({
  declarations: [TransferComponent],
  imports: [CommonModule, SharedModule, TransferRoutingModule]
})
export class TransferModule {}
