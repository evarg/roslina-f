import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producer, ProducersService } from 'src/app/services/producers.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export class ProducersDataSource extends DataSource<Producer> {
  /** Stream of data that is provided to the table. */
  private data;

  constructor(producersData: Producer[]) {
    super();
    this.data = new BehaviorSubject<Producer[]>(producersData);
  }

  connect(): Observable<Producer[]> {
    return this.data;
  }

  disconnect() {}
}

@Component({
  selector: 'app-producers-list',
  templateUrl: './producers-list.component.html',
  styleUrls: ['./producers-list.component.scss'],
})
export class ProducersListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'edit', 'delete'];
  dataSource: any = new MatTableDataSource<Producer>([]);

  public selection: SelectionModel<Producer>;

  constructor(
    private producersService: ProducersService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.selection = new SelectionModel<Producer>(true, []);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {}

  public ngOnInit(): void {
    this.handleProducersData();
    console.log('ngAfter');
  }

  private handleProducersData(): void {
    this.producersService.list().subscribe({
      next: (data) => {
        //this.dataSource = new ProducersDataSource(data);
        this.dataSource = new MatTableDataSource<Producer>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.sort);
      },
    });
  }

  private prepareProducersData(data: any): Producer {
    return data;
  }

  public dodaj() {
    console.log(this.dataSource);
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState.direction);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: Producer) => this.selection.select(row));
  }
}
