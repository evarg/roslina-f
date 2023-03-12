import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producer } from '../producers.service';

export enum ProducerFCN {
  NAME = 'name',
  DESC = 'desc',
  COUNTRY = 'country',
}

@Injectable({
  providedIn: 'root',
})
export class FormProducerService {
  constructor(private formBuilder: FormBuilder) {}

  public initForm(): FormGroup {
    return this.formBuilder.group({
      [ProducerFCN.NAME]: ['', [Validators.required, Validators.minLength(2)]],
      [ProducerFCN.DESC]: ['', []],
      [ProducerFCN.COUNTRY]: ['', []],
    });
  }

  prepareFormDataFromPacket(data: Producer) {
    return {
      [ProducerFCN.NAME]: data.name,
      [ProducerFCN.DESC]: data.desc,
      [ProducerFCN.COUNTRY]: data.country,
    };
  }

  preparePacketFromFormData(form: FormGroup): Producer {
    return {
      name: form.controls[ProducerFCN.NAME].value,
      desc: form.controls[ProducerFCN.DESC].value,
      country: form.controls[ProducerFCN.COUNTRY].value,
    };
  }
}
