import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ViewState } from 'src/app/enums/view-state';
import { Packet, PacketsService } from 'src/app/services/packets.service';
import { Producer, ProducersService } from 'src/app/services/producers.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

export enum FCN_PacketEdit {
  NAME = 'name',
  DESC = 'desc',
  NAME_POLISH = 'name_polish',
  NAME_LATIN = 'name_latin',
  PRODUCER_ID = 'producer_id',
  EXPIRATION_DATE = 'expiration_date',
  PURCHASE_DATE = 'purchase_date',
}

@Component({
  selector: 'app-producers-edit',
  templateUrl: './packets-edit.component.html',
  styleUrls: ['./packets-edit.component.scss'],
})
export class PacketsEditComponent implements OnInit {
  public packetID: number = 0;
  public packet: Packet = {} as Packet;
  public packetForm: FormGroup;
  public loadedProducers: Producer[];
  public viewState: ViewState = ViewState.LOADING;
  public ViewState: typeof ViewState = ViewState;
  public FCN_PacketEdit: typeof FCN_PacketEdit = FCN_PacketEdit;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private packetsService: PacketsService,
    private producersService: ProducersService,
    private fb: FormBuilder,
    private statusSnackBarService: SnackBarService
  ) {
    this.packetID = this.route.snapshot.params['id'];
    this.packetForm = this.fb.group({
      [FCN_PacketEdit.NAME]: [
        '',
        [Validators.required, Validators.minLength(2)],
      ],
      [FCN_PacketEdit.DESC]: [''],
      [FCN_PacketEdit.NAME_POLISH]: [''],
      [FCN_PacketEdit.NAME_LATIN]: [''],
      [FCN_PacketEdit.PRODUCER_ID]: [
        '',
        [Validators.required, Validators.min(1)],
      ],
      [FCN_PacketEdit.EXPIRATION_DATE]: [''],
      [FCN_PacketEdit.PURCHASE_DATE]: [''],
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
    this.packetsService.modify(this.packetID, dataValues).subscribe({
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
    this.changeViewState(ViewState.LOAD_ATTEMPT);
    this.packetsService.get(this.packetID).subscribe({
      next: (data) => {
        this.packetForm.setValue({
          name: data.name,
          desc: data.desc,
          name_polish: data.name_polish,
          name_latin: data.name_latin,
          producer_id: data.producer_id,
          expiration_date: moment(data.expiration_date, 'YYYY.MM.DD'),
          purchase_date: moment(data.purchase_date, 'YYYY.MM.DD'),
        });
        this.prepareProducersSelect(data.producer_id);
        this.changeViewState(ViewState.LOAD_SUCCESS);
      },
      error: (err) => {
        console.error(err);
        this.changeViewState(ViewState.LOAD_ERROR);
      },
    });
  }

  private prepareProducersSelect(producerID: number): void {
    this.producersService.list().subscribe((producersData) => {
      this.loadedProducers = producersData;
      this.packetForm.get('producer_id')?.setValue(producerID);
    });
  }
}
