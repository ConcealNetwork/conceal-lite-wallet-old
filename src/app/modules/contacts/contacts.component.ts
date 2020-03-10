import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Contacts {
  label: string;
  address: string;
  paymentid: string;
}

const names: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
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
export class ContactsComponent implements OnInit {

  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize: Number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['select', 'label', 'address', 'paymentid', 'actions'];
  dataSource: MatTableDataSource<Contacts>;
  selection = new SelectionModel<Contacts>(true, []);

  label: string;
  address: string;
  paymentid: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isLoading: boolean = true;
  
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
  checkboxLabel(row?: Contacts): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.label + 1}`;
  }

	constructor(public dialog: MatDialog) {
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

  /** Builds and returns a new User. */
  createContacts(date: number): Contacts {
    const name = names[Math.round(Math.random() * (names.length - 1))] + ' ' + names[Math.round(Math.random() * (names.length - 1))].charAt(0) + '.';
    return {
      label: name,
      address: Math.random().toString(36).substring(2, 25) + Math.random().toString(36).substring(2, 25),
      paymentid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    };
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewContactDialog, {
      width: '45%',
      data: {label: this.label, address: this.address, paymentid: this.paymentid}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.label = result;
    });
  }

}

@Component({
  selector: 'new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactDialog {

  constructor(
    public dialogRef: MatDialogRef<NewContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Contacts) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}