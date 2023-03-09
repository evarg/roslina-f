import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewState } from 'src/app/enums/view-state';
import { Producer, ProducersService } from 'src/app/services/producers.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-producers-edit',
  templateUrl: './producers-edit.component.html',
  styleUrls: ['./producers-edit.component.scss'],
})
export class ProducersEditComponent implements OnInit {
  public producerID: number = 0;
  public producerForm: FormGroup;
  public viewState: ViewState = ViewState.LOADING;
  public ViewState: typeof ViewState = ViewState;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private producersService: ProducersService,
    private fb: FormBuilder,
    private statusSnackBarService: SnackBarService
  ) {
    this.producerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(0)]],
      desc: [''],
      country: [''],
    });
    this.producerID = this.route.snapshot.params['id'];
  }

  public changeViewState(viewState: ViewState) {
    this.viewState = viewState;
    this.statusSnackBarService.show(viewState);
  }

  back(): void {
    this.changeViewState(ViewState.CLOSE);
    this.router.navigate(['/producers']);
  }

  onSave() {
    this.changeViewState(ViewState.SAVE_ATTEMPT);
    this.producersService
      .modify(this.producerID, this.producerForm.value)
      .subscribe({
        next: (data) => {
          this.changeViewState(ViewState.SAVE_SUCCESS);
        },
        error: (err) => {
          console.error(err);
          this.changeViewState(ViewState.SAVE_ERROR);
        },
      });
  }

  ngOnInit(): void {
    this.changeViewState(ViewState.LOAD_ATTEMPT);
    this.producersService.get(this.producerID).subscribe({
      next: (data) => {
        console.info(data);
        this.producerForm.setValue({
          name: data.name,
          desc: data.desc,
          country: data.country,
        });
        this.changeViewState(ViewState.LOAD_SUCCESS);
      },
      error: (err) => {
        console.error(err);
        this.changeViewState(ViewState.LOAD_ERROR);
      },
    });
  }
}
