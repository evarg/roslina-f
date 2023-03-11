import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacketsService } from 'src/app/services/packets.service';
import { ViewState } from 'src/app/enums/view-state';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Producer, ProducersService } from 'src/app/services/producers.service';

export enum ProducerAddFormControlName {
  NAME = 'name',
  DESC = 'desc',
  NAME_POLISH = 'name_polish',
  NAME_LATIN = 'name_latin',
  PRODUCER_ID = 'producer_id',
  EXPIRATION_DATE = 'expiration_date',
  PURCHASE_DATE = 'purchase_date',
}

@Component({
  selector: 'app-producers-add',
  templateUrl: './packets-add.component.html',
  styleUrls: ['./packets-add.component.scss'],
})
export class PacketsAddComponent implements OnInit {
  public packetForm: FormGroup;
  public viewState: ViewState = ViewState.LOADING;
  public ViewState: typeof ViewState = ViewState;
  public ProducerAddFormControlName: typeof ProducerAddFormControlName =
    ProducerAddFormControlName;
  public loadedProducers: Producer[];
  public selectedProducer = 8;

  constructor(
    public router: Router,
    private packetsService: PacketsService,
    private producersService: ProducersService,
    private fb: FormBuilder,
    private statusSnackBarService: SnackBarService
  ) {
    this.packetForm = this.fb.group({
      [ProducerAddFormControlName.NAME]: [
        '',
        [Validators.required, Validators.minLength(2)],
      ],
      [ProducerAddFormControlName.DESC]: [''],
      [ProducerAddFormControlName.NAME_POLISH]: [''],
      [ProducerAddFormControlName.NAME_LATIN]: [''],
      [ProducerAddFormControlName.PRODUCER_ID]: [
        '',
        [Validators.required, Validators.min(1)],
      ],
      [ProducerAddFormControlName.EXPIRATION_DATE]: ['', Validators.required],
      [ProducerAddFormControlName.PURCHASE_DATE]: ['', Validators.required],
    });
  }

  public changeViewState(viewState: ViewState) {
    this.viewState = viewState;
    this.statusSnackBarService.show(viewState);
  }

  onBack(): void {
    this.changeViewState(ViewState.CLOSE);
    this.router.navigate(['/packets']);
  }

  onSave() {
    let dataValues = this.packetForm.value;
    dataValues['expiration_date'] =
      dataValues.expiration_date.format('YYYY.MM.DD');
    dataValues['purchase_date'] = dataValues.purchase_date.format('YYYY.MM.DD');

    this.changeViewState(ViewState.SAVE_ATTEMPT);
    this.packetsService.create(dataValues).subscribe({
      next: (data) => {
        this.changeViewState(ViewState.SAVE_SUCCESS);
        this.router.navigate(['/packets/edit/' + data.id]);
      },
      error: (err) => {
        console.error(err);
        this.changeViewState(ViewState.SAVE_ERROR);
      },
    });
  }

  ngOnInit(): void {
    this.changeViewState(ViewState.SUCCESS);
    this.prepareProdcersSelect(0);
  }

  private prepareProdcersSelect(producerID: number): void {
    this.producersService.list().subscribe((producersData) => {
      this.loadedProducers = producersData;
      this.packetForm.get('producer_id')?.setValue(producerID);
    });
  }
}
