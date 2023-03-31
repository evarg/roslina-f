import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export enum LoginFCN {
    EMAIL = "email",
    PASSWORD = "password",
}

export interface LoginCredencials {
    email: string,
    password: string,
}

export interface UserData{
    id? : number,
    name: string,
    email: string,
    password?: string,
    password_confirmation?: string,
    created_at: string,
    updated_at: string
}

@Injectable({
    providedIn: "root",
})
export class FormLoginService {
    constructor(private formBuilder: FormBuilder) {}

    public initForm(): FormGroup {
        return this.formBuilder.group({
            [LoginFCN.EMAIL]: ["", [Validators.required, Validators.email, Validators.minLength(2)]],
            [LoginFCN.PASSWORD]: ["", [Validators.required]],
        });
    }

    public prepareCredencialsFromFormData(form: FormGroup): LoginCredencials {
        return {
            email: form.controls[LoginFCN.EMAIL].value,
            password: form.controls[LoginFCN.PASSWORD].value,
        };
    }
}
