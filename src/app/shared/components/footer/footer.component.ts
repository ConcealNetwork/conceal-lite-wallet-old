// Core
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [] 
})

export class FooterComponent implements OnInit, OnDestroy {

  isNodeOnline: boolean = false;
  isWalletOnline: boolean = false;

  ngOnInit() {
    this.isNodeOnline = true;
    this.isWalletOnline = true;
  }

  ngOnDestroy(){

  }

}