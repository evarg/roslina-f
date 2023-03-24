import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ViewState } from "src/app/enums/view-state";
import { AuthService } from "src/app/services/auth.service";
import { FormLoginService, LoginFCN } from "src/app/services/forms/form-login.service";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
    public loginForm: FormGroup;
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public LoginFCN: typeof LoginFCN = LoginFCN;
    public invalidCredencials = false;

    public getScreenWidth: any;
    public getScreenHeight: any;

    constructor(private formService: FormLoginService, public router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        if(this.authService.loggedIn())
            this.router.navigate([""]);


        this.loginForm = this.formService.initForm();
        this.getScreenWidth = window.innerWidth;
        this.getScreenHeight = window.innerHeight;
    }

    onLogin(): void {
        this.authService.loginToAPI(this.formService.prepareCredencialsFromFormData(this.loginForm)).subscribe({
            next: (data) => {
                this.authService.setLogin(data.access_token);
                window.location.reload();
            },
            error: (err) => {
                this.invalidCredencials = true;
                console.error(err);
            },
        });
    }

    onCancel(): void {
        this.router.navigate([""])
    }
}
