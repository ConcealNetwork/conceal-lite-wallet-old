// Core
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// Services
import { ElectronService } from '../../services/electron.service';
import { DataService } from '../../services/data.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: []
})

export class HeaderComponent implements OnInit {

  get isFullScreen():boolean { return this.dataService.isFullScreen; }
  set isFullScreen(value: boolean) { this.dataService.isFullScreen = value; }

  constructor(
		public electronService: ElectronService,
		private dataService: DataService,
		private dialogService: DialogService,
    public router: Router,
    private route: ActivatedRoute,
    public matIconRegistry: MatIconRegistry,
    public domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl(
        `assets/fonts/materal-icons-twotone.svg`
      )
    );
	}

	// Get Services
	getDialogService() {
		return this.dialogService;
	}
	getDataService() {
		return this.dataService;
	}

  logout() {
    this.electronService.window.close();
    console.log('Window closed');
  }

  fullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.electronService.window.setFullScreen(this.isFullScreen);
    console.log('Window maximized');
  }

  minimize() {
    this.electronService.window.minimize();
    console.log('Window minimized');
  }

  ngOnInit() {
    // Subscribe to routes
		this.route.params.subscribe( params => { const key = <string>params['key'] } );
  }

}