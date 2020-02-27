import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/services/route.service';
import { TransferComponent } from './transfer.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/transfer', pathMatch: 'full' },
  { path: 'transfer', component: TransferComponent }
]);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule {}
