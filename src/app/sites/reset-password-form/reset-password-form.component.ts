import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewState } from "src/app/enums/view-state";
import { AuthService } from "src/app/services/auth.service";
import { ResetFCN, ResetPasswordService } from "src/app/services/forms/reset-password.service";

@Component({
    selector: "app-reset-password-form",
    templateUrl: "./reset-password-form.component.html",
    styleUrls: ["./reset-password-form.component.scss"],
})
export class ResetPasswordFormComponent implements OnInit {
    public resetForm: FormGroup;
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public ResetFCN: typeof ResetFCN = ResetFCN;
    public invalidCredencials = false;
    public token: string = '';
    public success: boolean = false;

    constructor(
        private formService: ResetPasswordService,
        public router: Router,
        public route: ActivatedRoute,
        private authService: AuthService
    ) {}

    public changeViewState(viewState: ViewState) {
        this.viewState = viewState;
    }

    ngOnInit(): void {
        console.log(this.route.snapshot.params)
        this.resetForm = this.formService.initForm();
        this.resetForm.controls[ResetFCN.EMAIL].setValue(this.route.snapshot.params["email"]);
        this.token = this.route.snapshot.params["token"];
    }

    onCancel(): void {
        this.router.navigate([""]);
    }

    onReset(): void {
        this.changeViewState(ViewState.SAVE_ATTEMPT);
        let credencials = this.formService.prepareCredencialsFromFormData(this.resetForm)
        credencials.token = this.token

        this.authService.resetPassword(credencials).subscribe({
            next: (data) => {
                this.changeViewState(ViewState.SAVE_SUCCESS);
            },
            error: (err) => {
                console.error(err);
                this.changeViewState(ViewState.SAVE_ERROR);
            },
        });
//        this.router.navigate([""]);
    }
}
