import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum ProfileFCN {
    NAME = "name",
    OLD_PASSWORD = "old_password",
    PASSWORD = "password",
    PASSWORD_CONFIRM = "password_confirmation",
}

export interface ProfileCredencials {
    name: string,
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
export class ProfileService {

    constructor(private formBuilder: FormBuilder) {}

    public initForm(): FormGroup {
        return this.formBuilder.group({
            [ProfileFCN.NAME]: ["", [Validators.required]],
            [ProfileFCN.OLD_PASSWORD]: ["", [Validators.minLength(4)]],
            [ProfileFCN.PASSWORD]: ["", [Validators.minLength(4)]],
            [ProfileFCN.PASSWORD_CONFIRM]: ["", [Validators.minLength(4)]],
        }, {
            validator: ConfirmedValidator(ProfileFCN.PASSWORD, ProfileFCN.PASSWORD_CONFIRM)
          });
    }

    public prepareCredencialsFromFormData(form: FormGroup): ProfileCredencials {
        return {
            name: form.controls[ProfileFCN.NAME].value,
            password: form.controls[ProfileFCN.PASSWORD].value,
            password_confirmation: form.controls[ProfileFCN.PASSWORD_CONFIRM].value,
        };
    }
}
