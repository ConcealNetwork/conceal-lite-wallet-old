// Angular Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ActivityComponent } from './modules/activity/activity.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LockComponent } from './modules/lock/lock.component';
import { MessagingComponent } from './modules/messaging/messaging.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { TransferComponent } from './modules/transfer/transfer.component';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent, },
	{ path: 'activity', component: ActivityComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'lock', component: LockComponent },
	{ path: 'message', component: MessagingComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'transfer', component: TransferComponent },
	{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
