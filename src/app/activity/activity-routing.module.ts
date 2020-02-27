import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/services/route.service';
import { ActivityComponent } from './activity.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/activity', pathMatch: 'full' },
  { path: 'activity', component: ActivityComponent }
]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {}
