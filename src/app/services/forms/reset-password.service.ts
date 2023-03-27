import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export enum ResetFCN {
    EMAIL = "email",
    PASSWORD = "password",
    PASSWORD_CONFIRM = "password_confirmation",
}

export interface ResetCredencials {
    email: string,
    password: string,
    password_confirmation: string,
    token: string
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
    providedIn: "root",
})
export class ResetPasswordService {
    constructor(private formBuilder: FormBuilder) {}

    public initForm(): FormGroup {
        return this.formBuilder.group({
            [ResetFCN.EMAIL]: ["", [Validators.required, Validators.email]],
            [ResetFCN.PASSWORD]: ["", [Validators.required, Validators.minLength(4)]],
            [ResetFCN.PASSWORD_CONFIRM]: ["", [Validators.required, Validators.minLength(4)]],
        }, {
            validator: ConfirmedValidator(ResetFCN.PASSWORD, ResetFCN.PASSWORD_CONFIRM)
          });
    }

    public prepareCredencialsFromFormData(form: FormGroup): ResetCredencials {
        return {
            email: form.controls[ResetFCN.EMAIL].value,
            password: form.controls[ResetFCN.PASSWORD].value,
            password_confirmation: form.controls[ResetFCN.PASSWORD_CONFIRM].value,
            token: ''
        };
    }
}
