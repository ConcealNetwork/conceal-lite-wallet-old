// Anguler Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ActivityRoutingModule } from './activity-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { ActivityComponent } from './activity.component';

@NgModule({
  declarations: [ActivityComponent],
  imports: [CommonModule, SharedModule, ActivityRoutingModule]
})
export class ActivityModule {}
