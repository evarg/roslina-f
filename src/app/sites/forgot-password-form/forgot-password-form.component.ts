import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewState } from 'src/app/enums/view-state';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordFCN, ForgotPasswordService } from 'src/app/services/forms/forgot-password.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent implements OnInit {

    public forgotPasswordForm: FormGroup;
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public ForgotPasswordFCN: typeof ForgotPasswordFCN = ForgotPasswordFCN;
    public invalidCredencials = false;

    public getScreenWidth: any;
    public getScreenHeight: any;

    constructor(private formService: ForgotPasswordService, public router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        if(this.authService.loggedIn())
            this.router.navigate([""]);

        this.forgotPasswordForm = this.formService.initForm();
    }

    onLogin(): void {
        // this.authService.loginToAPI(this.formService.prepareCredencialsFromFormData(this.forgotPasswordForm)).subscribe({
        //     next: (data) => {
        //         this.authService.setLogin(data.access_token);
        //         this.router.navigate([""]);
        //     },
        //     error: (err) => {
        //         this.invalidCredencials = true;
        //         console.error(err);
        //     },
        // });
    }

    onCancel(): void {
        this.router.navigate([""])
    }
}
