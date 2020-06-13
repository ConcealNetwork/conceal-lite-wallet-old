// Angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

// Services
import { DataService } from '../../services/data.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-footer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  // Progress Bar
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'indeterminate';

  constructor (
		private dataService: DataService,
		private helperService: HelperService
	) {	}

	getDataService() {
		return this.dataService;
	}
	getHelperService() {
		return this.helperService;
	}

  ngOnInit() {

	}

}