import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/services/route.service';
import { MessagingComponent } from './messaging.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/messaging', pathMatch: 'full' },
  { path: 'messaging', component: MessagingComponent }
]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagingRoutingModule {}
