// Anguler Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { LockRoutingModule } from './lock-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { LockComponent } from './lock.component';

@NgModule({
  declarations: [LockComponent],
  imports: [CommonModule, SharedModule, LockRoutingModule]
})
export class LockModule {}
