import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewState } from 'src/app/enums/view-state';
import { RegisterFCN, RegisterLoginService } from 'src/app/services/forms/register-login.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
    public registerForm: FormGroup;
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public RegisterFCN: typeof RegisterFCN = RegisterFCN;
    public invalidCredencials = false;

    constructor(private formService: RegisterLoginService, public router: Router, private registerService: RegisterService) {}

    ngOnInit(): void {
        this.registerForm = this.formService.initForm()
    }

    onRegister(): void {
        this.registerService.register(this.formService.prepareCredencialsFromFormData(this.registerForm)).subscribe({
            next: (data) => {
                this.router.navigate([""])
            },
            error: (err) => {
                this.registerForm.controls[RegisterFCN.EMAIL].setErrors({ alreadyTaken: true });
                console.error(err);
            },
        });
    }

    onCancel(): void {
        this.router.navigate([""])
    }
}
