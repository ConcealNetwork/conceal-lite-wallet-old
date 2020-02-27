import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  number: number = 150;
  speed: number = 0.3;
  repulseDistance: number = 0;
  bounce: number = 0;
  particleHex: string = '#222';
  linkHex: string = '#444';

  constructor() { }

  ngOnInit() { }

}
