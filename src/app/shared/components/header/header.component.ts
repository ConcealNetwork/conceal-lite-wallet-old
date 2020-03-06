// Core
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// Services
import { ElectronService } from './../../services/electron.service';
import { DataService } from './../../services/data.service';

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
    public router: Router,
    private route: ActivatedRoute,
    public electronService: ElectronService,
    public dataService: DataService,
    public matIconRegistry: MatIconRegistry,
    public domSanitizer: DomSanitizer
  ) { 
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl(
        `assets/materal-icons-twotone.svg`
      )
    );
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