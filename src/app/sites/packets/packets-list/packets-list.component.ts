import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewState } from 'src/app/enums/view-state';
import { Packet, PacketsService } from 'src/app/services/packets.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-packets-list',
  templateUrl: './packets-list.component.html',
  styleUrls: ['./packets-list.component.scss'],
})
export class PacketsListComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  public dataSource: any = new MatTableDataSource<Packet>([]);
  public viewState: ViewState = ViewState.LOADING;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private packetsService: PacketsService,
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
    this.packetsService.list().subscribe({
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
