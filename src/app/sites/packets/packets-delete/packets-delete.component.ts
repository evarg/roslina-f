import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewState } from 'src/app/enums/view-state';
import { Packet, PacketsService } from 'src/app/services/packets.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-packets-delete',
  templateUrl: './packets-delete.component.html',
  styleUrls: ['./packets-delete.component.scss']
})
export class PacketsDeleteComponent implements OnInit {

  public packetID: number = 0;
  public viewState: ViewState = ViewState.LOADING;
  public ViewState: typeof ViewState = ViewState;
  public packet: Packet = {} as Packet;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private packetsService: PacketsService,
    private statusSnackBarService: SnackBarService
  ) {
    this.packetID = this.route.snapshot.params['id'];
  }

  public changeViewState(viewState: ViewState) {
    this.viewState = viewState;
    this.statusSnackBarService.show(viewState);
  }

  ngOnInit(): void {
    this.changeViewState(ViewState.LOAD_ATTEMPT);
    this.packetsService.get(this.packetID).subscribe({
      next: (data) => {
        this.packet = data;
        this.changeViewState(ViewState.LOAD_SUCCESS);
      },
      error: (err) => {
        console.error(err);
        this.changeViewState(ViewState.LOAD_ERROR);
      },
    });
  }

  onBack(): void {
    this.changeViewState(ViewState.CLOSE);
    this.router.navigate(['/packets']);
  }

  onDelete(): void {
    this.changeViewState(ViewState.SAVE_ATTEMPT);
    this.packetsService.delete(this.packetID).subscribe({
      next: (data) => {
        this.changeViewState(ViewState.SAVE_SUCCESS);
        this.router.navigate(['/packets']);
      },
      error: (err) => {
        console.error(err);
        this.changeViewState(ViewState.SAVE_ERROR);
      },
    });
  }

}
