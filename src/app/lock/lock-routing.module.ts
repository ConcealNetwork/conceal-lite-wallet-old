import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/services/route.service';
import { LockComponent } from './lock.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/lock', pathMatch: 'full' },
  { path: 'lock', component: LockComponent }
]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockRoutingModule {}
