import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producer, ProducersService } from 'src/app/services/producers.service';

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
  displayedColumns: string[] = [
    'producerID',
    'producerName',
    'producerEdit',
    'producerDelete',
  ];
  dataSource: any = new MatTableDataSource<Producer>([]);

  constructor(private producersService: ProducersService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
  }

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
        console.log(this.dataSource.paginator);
      },
    });
  }

  private prepareProducersData(data: any): Producer {
    return data;
  }

  public dodaj() {
    console.log(this.dataSource);
  }
}
