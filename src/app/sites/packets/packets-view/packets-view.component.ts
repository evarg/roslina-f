import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewState } from 'src/app/enums/view-state';
import { ConfigService } from 'src/app/services/config.service';
import { Packet, PacketsService } from 'src/app/services/packets.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-producers-view',
  templateUrl: './packets-view.component.html',
  styleUrls: ['./packets-view.component.scss']
})
export class PacketsViewComponent implements OnInit {
  public packetID: number = 0;
  public viewState: ViewState = ViewState.LOADING;
  public ViewState: typeof ViewState = ViewState;
  public packet: Packet = {} as Packet;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private packetsService: PacketsService,
    private statusSnackBarService: SnackBarService,
    private configService: ConfigService
  ) {
    this.packetID = this.route.snapshot.params['id'];
  }

  public changeViewState(viewState: ViewState) {
    this.viewState = viewState;
    this.statusSnackBarService.show(viewState);
  }

  getMiniature(fileName: string):string{
    return this.configService.API_IMAGE + fileName.replace('public', 'storage');
  }

  ngOnInit(): void {
    this.changeViewState(ViewState.LOAD_ATTEMPT);
    this.packetsService.get(this.packetID).subscribe({
      next: (data) => {
        this.packet = data;
        console.log(data.producer);
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
}
