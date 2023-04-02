import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
export class UploadFileComponent implements OnInit{
    public producerID: number = 0;
    public fileForm: FormGroup;
    public producerTitle: string = "";
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public FileFCN: typeof FileFCN = FileFCN;
    private filesToUpload: FileList;

    @ViewChild("image") fileInput: ElementRef;
    public fileMessage = "Wybierz plik";

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
        console.log(this.fileForm.get(FileFCN.IMAGE));

        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.fileUploadService.upload(this.filesToUpload[i]).subscribe({
                next: (data) => {
                    console.log(
                        "🚀 ~ file: upload-file.component.ts:67 ~ UploadFileComponent ~ this.fileUploadService.upload ~ data:",
                        data
                    );
                    this.changeViewState(ViewState.LOAD_SUCCESS);
                },
                error: (err) => {
                    console.error(err);
                    this.changeViewState(ViewState.LOAD_ERROR);
                },
            });
        }
    }

    saveEdit() {}

    initAdd() {
        this.producerTitle = "Nowy poducent";
    }

    initEdit() {}

    uploadFileEvt(imgFile: any) {
        console.log(imgFile.target.files[0]);
        this.filesToUpload = imgFile.target.files;

        if (imgFile.target.files && imgFile.target.files[0]) {
            this.fileMessage = "";
            Array.from(imgFile.target.files).forEach((file: any) => {
                this.fileMessage += file.name + " - ";
            });
            // HTML5 FileReader API
            let reader = new FileReader();
            reader.onload = (e: any) => {
                let image = new Image();
                image.src = e.target.result;
                image.onload = (rs) => {
                    let imgBase64Path = e.target.result;
                };
            };
            reader.readAsDataURL(imgFile.target.files[0]);
            // Reset if duplicate image uploaded again
            //this.fileInput.nativeElement.value = "";
        } else {
            this.fileMessage = "Choose File";
        }
    }
}
