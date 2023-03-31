import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum ImageFCN {
    NAME = "name",
    FILE = "image",
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

    constructor(private formBuilder: FormBuilder) {}

    public initForm(): FormGroup {
        return this.formBuilder.group({
            [ImageFCN.NAME]: ["" ],
            [ImageFCN.FILE]: ["" ],
        })
    }
}

