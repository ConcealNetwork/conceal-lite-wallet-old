// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MessagingRoutingModule } from './messaging-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { MessagingComponent } from './messaging.component';

@NgModule({
  declarations: [MessagingComponent],
  imports: [CommonModule, SharedModule, MessagingRoutingModule]
})
export class MessagingModule {}