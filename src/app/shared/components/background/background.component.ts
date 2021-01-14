import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  number: number = 150;
  speed: number = 0.3;
  repulseDistance: number = 0;
  bounce: number = 0;
  particleHex: string = '#222';
  linkHex: string = '#444';

  constructor() { }

  ngOnInit() { }

}
