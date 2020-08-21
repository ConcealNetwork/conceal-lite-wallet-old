// Angular Core
import { Component } from '@angular/core';

// 3rd Party
import { TranslateService } from '@ngx-translate/core';

// Services
import { ElectronService } from './shared/services/electron.service';
import { WatcherService } from './shared/services/watcher.service';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	timeout: number = 2000;
	interval: number = 20000;

  constructor(
		public electronService: ElectronService,
		private watcherService: WatcherService,
    private translate: TranslateService
  ) {

    translate.setDefaultLang('en');
		console.log('AppConfig', AppConfig);

		setTimeout(() => {
			setInterval(() => {
				this.watcherService.checkForWallet();
				this.watcherService.checkForTransactions();
				this.watcherService.updateWallets();
			}, this.interval);
		}, this.timeout);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
		}

  }
}
