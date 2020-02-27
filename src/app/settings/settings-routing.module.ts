import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/services/route.service';
import { SettingsComponent } from './settings.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/settings', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent }
]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
