import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewState } from 'src/app/enums/view-state';
import { Producer, ProducersService } from 'src/app/services/producers.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-producers-list',
  templateUrl: './producers-list.component.html',
  styleUrls: ['./producers-list.component.scss'],
})
export class ProducersListComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  public dataSource: any = new MatTableDataSource<Producer>([]);
  public viewState: ViewState = ViewState.LOADING;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private producersService: ProducersService,
    private statusSnackBarService: SnackBarService
  ) {}

  public changeViewState(viewState: ViewState) {
    this.viewState = viewState;
    this.statusSnackBarService.show(viewState);
  }

  public ngOnInit(): void {
    this.handleProducersData();
  }

  private handleProducersData(): void {
    this.changeViewState(ViewState.LOAD_ATTEMPT);
    this.producersService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeViewState(ViewState.LOAD_SUCCESS);
      },
      error: (err) => {
        console.error(err);
        this.changeViewState(ViewState.LOAD_ERROR);
      },
    });
  }

}
