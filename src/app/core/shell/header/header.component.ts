// Core
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [] 
})

export class HeaderComponent implements OnInit {

  isFullScreen: boolean;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public electronService: ElectronService
  ) { 
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