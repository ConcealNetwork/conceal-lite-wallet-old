import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Transactions {
  date: string;
  amount: number;
  fee: number;
  height: number;
}

@Component({
	selector: 'app-activity',
	templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
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
export class ActivityComponent implements OnInit {

  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize: Number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['date', 'amount', 'fee', 'height'];
  dataSource: MatTableDataSource<Transactions>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

	isLoading: boolean = true;

	constructor() {
    // Create 100 users
    const transactions = Array.from({length: 100}, (_, k) => this.createTransactions(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(transactions);
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
  createTransactions(date: number): Transactions {
    return {
      date: this.randomDate(new Date(2012, 0, 1), new Date()),
      amount: Math.floor(Math.random() * 16) + 5,
      fee: Math.floor(Math.random() * (1 - 0.0001 + 1)) + 0.0001,
      height: Math.floor(Math.random() * (557352 - 457352 + 1)) + 457352
    };

  }

}
