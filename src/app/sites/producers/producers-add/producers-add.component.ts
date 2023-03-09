import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';
import { ViewState } from 'src/app/enums/view-state';
import { SnackBarService } from 'src/app/services/snack-bar.service';

export enum ProducerAddFormControlName {
  NAME = 'name',
  DESC = 'desc',
  COUNTRY = 'country'
}

@Component({
  selector: 'app-producers-add',
  templateUrl: './producers-add.component.html',
  styleUrls: ['./producers-add.component.scss'],
})
export class ProducersAddComponent implements OnInit {
  public producerForm: FormGroup;
  public viewState: ViewState = ViewState.LOADING;
  public ViewState: typeof ViewState = ViewState;

  constructor(
    public router: Router,
    private location: Location,
    private producersService: ProducersService,
    private fb: FormBuilder,
    private statusSnackBarService: SnackBarService
  ) {
    this.producerForm = this.fb.group({
      [ProducerAddFormControlName.NAME]: ['', [Validators.required, Validators.minLength(0)]],
      [ProducerAddFormControlName.DESC]: [''],
      [ProducerAddFormControlName.COUNTRY]: ['']
    });
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
    this.producersService.create(this.producerForm.value).subscribe(
      {
        next: data => {
          this.changeViewState(ViewState.SAVE_SUCCESS);
          console.info(data.id);
          this.router.navigate(['/producers/edit/' + data.id]);

        },
        error: err => {
          console.error(err);
          this.changeViewState(ViewState.SAVE_ERROR);
        }
      }
    );
  }

  ngOnInit(): void {
    this.changeViewState(ViewState.SUCCESS)
  }
}
