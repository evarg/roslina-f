import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export enum ForgotPasswordFCN {
    EMAIL = "email",
}

export interface ForgotPasswordsCredencials {
    email: string,
}

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
    constructor(private formBuilder: FormBuilder) {}

    public initForm(): FormGroup {
        return this.formBuilder.group({
            [ForgotPasswordFCN.EMAIL]: ["", [Validators.required, Validators.email]],
        });
    }

    public prepareCredencialsFromFormData(form: FormGroup): ForgotPasswordsCredencials {
        return {
            email: form.controls[ForgotPasswordFCN.EMAIL].value,
        };
    }
}
