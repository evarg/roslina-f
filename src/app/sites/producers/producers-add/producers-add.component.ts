import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';
import { ViewState } from 'src/app/enums/view-state';

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
    private fb: FormBuilder
  ) {
    this.producerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(0)]],
      desc: [''],
    });
  }

  back(): void {
    this.viewState = ViewState.CLOSE;
    this.router.navigate(['/producers']);
  }
  
  onSave() {
    this.viewState = ViewState.SAVE_ATTEMPT;
    this.producersService.create(this.producerForm.value).subscribe(
      {
        next: data => {
          console.info(data.id);
          this.viewState = ViewState.SAVE_SUCCESS;
          this.router.navigate(['/producers/edit/' + data.id]);

        },
        error: err => {
          console.error(err);
          this.viewState = ViewState.SAVE_ERROR;
        }
      }
    );
  }

  ngOnInit(): void {
    this.viewState = ViewState.SUCCESS;
  }
}
