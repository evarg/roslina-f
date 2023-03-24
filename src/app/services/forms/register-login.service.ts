import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum RegisterFCN {
    NAME = "name",
    EMAIL = "email",
    PASSWORD = "password",
    PASSWORD_CONFIRM = "password_confirmation",
}

export interface RegisterCredencials {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

    constructor(private formBuilder: FormBuilder) {}

    public initForm(): FormGroup {
        return this.formBuilder.group({
            [RegisterFCN.NAME]: ["", [Validators.required]],
            [RegisterFCN.EMAIL]: ["", [Validators.required, Validators.email]],
            [RegisterFCN.PASSWORD]: ["", [Validators.required]],
            [RegisterFCN.PASSWORD_CONFIRM]: ["", [Validators.required]],
        }, {
            validator: ConfirmedValidator(RegisterFCN.PASSWORD, RegisterFCN.PASSWORD_CONFIRM)
          });
    }

    public prepareCredencialsFromFormData(form: FormGroup): RegisterCredencials {
        return {
            name: form.controls[RegisterFCN.NAME].value,
            email: form.controls[RegisterFCN.EMAIL].value,
            password: form.controls[RegisterFCN.PASSWORD].value,
            password_confirmation: form.controls[RegisterFCN.PASSWORD_CONFIRM].value,
        };
    }
}
