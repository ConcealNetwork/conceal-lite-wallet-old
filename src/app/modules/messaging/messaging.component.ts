import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Messages {
  date: string;
  type: string;
  height: number;
  message: string;
}

export interface NewMessage {
  address: string;
  message: string;
}

const types: string[] = ['Sent', 'Received'];
const messages: string[] = ['This is a test message.', 'Just another test message.', 'Hi there, im just testing out messaging on the wallet'];

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
  displayedColumns: string[] = ['date', 'type', 'height', 'message'];
  dataSource: MatTableDataSource<Messages>;
  selection = new SelectionModel<Messages>(true, []);
  isLoading: boolean = true;

  address: string;
  message: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Messages): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.date + 1}`;
  }

	constructor() {
    // Create 100 users
    const contacts = Array.from({length: 100}, (_, k) => this.createContacts(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(contacts);
  }

	ngOnInit(): void {
    this.isLoading = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
  }

  /** Builds and returns a new User. */
  createContacts(date: number): Messages {
    const type = types[Math.round(Math.random() * (types.length - 1))];
    const message = messages[Math.round(Math.random() * (messages.length - 1))];
    return {
      date: this.randomDate(new Date(2012, 0, 1), new Date()),
      type: type,
      height: Math.floor(Math.random() * (557352 - 457352 + 1)) + 457352,
      message: message
    };

  }

}