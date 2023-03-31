import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum SearchPacketFCN {
    SEARCH = "search",
}

@Injectable({
  providedIn: 'root'
})
export class SearchPacketService {

    constructor(private formBuilder: FormBuilder) {}

    public initForm(): FormGroup {
      return this.formBuilder.group({
        [SearchPacketFCN.SEARCH]: ['', [Validators.required, Validators.minLength(1)]],
      });
    }
}
