// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [] 
})

export class FooterComponent implements OnInit, OnDestroy {

  // Progress Bar
  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  isNodeOnline: boolean = false;
  isWalletOnline: boolean = false;
  isSynchronising: boolean = true;
  syncPercentage: number = 0;

  ngOnInit() {
    this.isNodeOnline = true;
    this.isWalletOnline = true;
    this.isSynchronising = true;
    this.syncPercentage = 68;
  }

  ngOnDestroy(){

  }

}