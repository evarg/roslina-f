import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ViewState } from "src/app/enums/view-state";
import { FileFCN, FormFileService } from "src/app/services/forms/form-file.service";
import { SnackBarService } from "src/app/services/snack-bar.service";
import { FileUploadService } from "src/app/services/upload-file.service";

@Component({
    selector: "app-upload-file",
    templateUrl: "./upload-file.component.html",
    styleUrls: ["./upload-file.component.scss"],
})
export class UploadFileComponent {
    public producerID: number = 0;
    public fileForm: FormGroup;
    public producerTitle: string = "";
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public FileFCN: typeof FileFCN = FileFCN;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private fileUploadService: FileUploadService,
        private formService: FormFileService,
        private statusSnackBarService: SnackBarService
    ) {
        if (this.route.snapshot.params["id"]) {
            this.producerID = this.route.snapshot.params["id"];
        }
    }

    public changeViewState(viewState: ViewState) {
        this.viewState = viewState;
        this.statusSnackBarService.show(viewState);
    }

    ngOnInit(): void {
        this.fileForm = this.formService.initForm();
        if (this.producerID) this.initEdit();
        else this.initAdd();
    }

    onBack(): void {
        this.changeViewState(ViewState.CLOSE);
        this.router.navigate(["/files"]);
    }

    onSave() {
        if (this.producerID) this.saveEdit();
        else this.saveAdd();
    }

    saveAdd() {
        this.changeViewState(ViewState.SAVE_ATTEMPT);
        this.fileUploadService.upload(this.fileForm.value).subscribe({
            next: (data) => {
                this.changeViewState(ViewState.SAVE_SUCCESS);
                this.router.navigate(["/producers/edit/" + data.id]);
            },
            error: (err) => {
                console.error(err);
                this.changeViewState(ViewState.SAVE_ERROR);
            },
        });
    }

    saveEdit() {
    }

    initAdd() {
        this.producerTitle = "Nowy poducent";
    }

    initEdit() {
    }
}
