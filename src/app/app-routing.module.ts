// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ActivityComponent } from './modules/activity/activity.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthComponent } from './modules/auth/auth.component';
import { MessagingComponent } from './modules/messaging/messaging.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { TransferComponent } from './modules/transfer/transfer.component';
import { PayComponent } from './modules/pay/pay.component';

// Services
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'activity', component: ActivityComponent, canActivate: [AuthGuard] },
	{ path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
	{ path: 'auth', component: AuthComponent },
	{ path: 'message', component: MessagingComponent, canActivate: [AuthGuard] },
	{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
	{ path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
	{ path: 'pay', component: PayComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
	providers: [AuthGuard],
})
export class AppRoutingModule { }
