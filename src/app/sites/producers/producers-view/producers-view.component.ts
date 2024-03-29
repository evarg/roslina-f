import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewState } from 'src/app/enums/view-state';
import { Producer, ProducersService } from 'src/app/services/producers.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-producers-view',
  templateUrl: './producers-view.component.html',
  styleUrls: ['./producers-view.component.scss'],
})
export class ProducersViewComponent implements OnInit {
  public producerID: number = 0;
  public viewState: ViewState = ViewState.LOADING;
  public ViewState: typeof ViewState = ViewState;
  public producer: Producer = {} as Producer;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private producersService: ProducersService,
    private statusSnackBarService: SnackBarService
  ) {
    this.producerID = this.route.snapshot.params['id'];
  }

  public changeViewState(viewState: ViewState) {
    this.viewState = viewState;
    this.statusSnackBarService.show(viewState);
  }

  ngOnInit(): void {
    this.changeViewState(ViewState.LOAD_ATTEMPT);
    this.producersService.get(this.producerID).subscribe({
      next: (data) => {
        this.producer = data;
        console.log(data)
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
    this.router.navigate(['/producers']);
  }

}
