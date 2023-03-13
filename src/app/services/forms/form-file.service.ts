import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

export enum FileFCN {
    NAME = "name",
    IMAGE = "image",
}

@Injectable({
    providedIn: "root",
})
export class FormFileService {
    constructor(private formBuilder: FormBuilder) {}

    public initForm() {
        return this.formBuilder.group({
            [FileFCN.NAME]: ["testunio", [Validators.required, Validators.minLength(2)]],
            [FileFCN.IMAGE]: ["", []],
        });
    }
}
