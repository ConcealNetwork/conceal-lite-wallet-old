// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { HelperService } from './../../shared/services/helper.service';
import { DialogService } from '../../shared/services/dialog.service';
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';

export interface Messages {
	message: string;
	timestamp: string;
	sdm: string;
	type: string;
}

export interface NewMessage {
  address: string;
  message: string;
}

@Component({
	selector: 'app-messaging',
	templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity:0}),
          animate(400, style({opacity:1}))
        ]),
        transition(':leave', [
          style({opacity:1}),
          animate(400, style({opacity:0}))
        ])
      ]
    ),
    trigger('stagger', [
      transition('* => *', [
        query('#cards', style({ opacity: 0, transform: 'translateX(-40px)' }), {optional: true}),
        query('#cards', stagger('300ms', [
          animate('600ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ]), {optional: true}),
        query('#cards', [
          animate(1000, style('*'))
        ], {optional: true})
      ])
    ])
  ]
})
export class MessagingComponent implements OnInit {

  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize: Number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['type', 'timestamp', 'sdm', 'message'];
  dataSource: MatTableDataSource<Messages>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

	constructor (
		private authService: AuthService,
		private helperService: HelperService,
		private dataService: DataService,
		private dialogService: DialogService,
	) {
		this.helperService.getMessages();
		setTimeout(() => {
			// Assign the data to the data source for the table to render
			this.dataSource = new MatTableDataSource(this.dataService.messages);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		}, 1500);
	}

	// Get Services
	getDialogService() {
		return this.dialogService;
	}
	getHelperService() {
		return this.helperService;
	}
	getDataService() {
		return this.dataService;
	}

	ngOnInit(): void {
		this.dataService.isLoggedIn = this.authService.loggedIn();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}