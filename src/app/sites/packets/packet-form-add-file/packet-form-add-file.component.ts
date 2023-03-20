import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewState } from "src/app/enums/view-state";
import { FileFCN, FormFileService } from "src/app/services/forms/form-file.service";
import { PacketsService } from "src/app/services/packets.service";
import { ProducersService } from "src/app/services/producers.service";
import { SnackBarService } from "src/app/services/snack-bar.service";

@Component({
    selector: "app-packet-form-add-file",
    templateUrl: "./packet-form-add-file.component.html",
    styleUrls: ["./packet-form-add-file.component.scss"],
})
export class PacketFormAddFileComponent implements OnInit {
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
        private packetsService: PacketsService,
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
    }

    onBack(): void {
        this.changeViewState(ViewState.CLOSE);
        this.router.navigate(["/files"]);
    }

    onSave() {
        this.changeViewState(ViewState.SAVE_ATTEMPT);
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.packetsService.upload(this.producerID, this.filesToUpload[i]).subscribe({
                next: (data) => {
                    this.changeViewState(ViewState.SAVE_SUCCESS);
                },
                error: (err) => {
                    console.error(err);
                    this.changeViewState(ViewState.SAVE_ERROR);
                },
            });
        }
    }

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
        } else {
            this.fileMessage = "Choose File";
        }
    }
}
