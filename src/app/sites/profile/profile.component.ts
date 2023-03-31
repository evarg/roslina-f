import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewState } from "src/app/enums/view-state";
import { AuthService } from "src/app/services/auth.service";
import { UserData } from "src/app/services/forms/form-login.service";
import { ProfileService, ProfileFCN } from "src/app/services/forms/profile.service";
import { PacketsService } from "src/app/services/packets.service";
import { Producer, ProducersService } from "src/app/services/producers.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
    public profileForm: FormGroup;
    public userData: UserData;
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public ProfileFCN: typeof ProfileFCN = ProfileFCN;
    public invalidCredencials = false;
    public userID: number;
    public errorMessage: string = "A";

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private formService: ProfileService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.profileForm = this.formService.initForm();

        this.authService.me().subscribe({
            next: (data) => {
                this.viewState = ViewState.LOAD_SUCCESS;
                if (data.id) this.userID = data.id;
                this.profileForm.controls[ProfileFCN.NAME].setValue(data.name);
            },
            error: (err) => {
                console.error(err);
                this.viewState = ViewState.LOAD_ERROR;
            },
        });
    }

    onBack(): void {
        this.errorMessage = "Asdfasdf"
    }

    onSave() {
        this.viewState = ViewState.SAVE_ATTEMPT;

        this.userService.modify(this.userID, this.profileForm.value).subscribe({
            next: (data) => {
                this.viewState = ViewState.SAVE_SUCCESS;
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = err.error.message;
                this.viewState = ViewState.SAVE_ERROR;
            },
        });
    }
}
