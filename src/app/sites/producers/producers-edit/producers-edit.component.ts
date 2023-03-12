import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewState } from "src/app/enums/view-state";
import { FormProducerService, ProducerFCN } from "src/app/services/forms/form-producer.service";
import { ProducersService } from "src/app/services/producers.service";
import { SnackBarService } from "src/app/services/snack-bar.service";

@Component({
    selector: "app-producers-edit",
    templateUrl: "./producers-edit.component.html",
    styleUrls: ["./producers-edit.component.scss"],
})
export class ProducersEditComponent implements OnInit {
    public producerID: number = 0;
    public producerForm: FormGroup;
    public producerTitle: string = "";
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public ProducerFCN: typeof ProducerFCN = ProducerFCN;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private producersService: ProducersService,
        private formService: FormProducerService,
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
        this.producerForm = this.formService.initForm();
        if (this.producerID) this.initEdit();
        else this.initAdd();
    }

    onBack(): void {
        this.changeViewState(ViewState.CLOSE);
        this.router.navigate(["/producers"]);
    }

    onSave() {
        if (this.producerID) this.saveEdit();
        else this.saveAdd();
    }

    saveAdd() {
        this.changeViewState(ViewState.SAVE_ATTEMPT);
        this.producersService.create(this.producerForm.value).subscribe({
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
        this.changeViewState(ViewState.SAVE_ATTEMPT);
        this.producersService.modify(this.producerID, this.producerForm.value).subscribe({
            next: (data) => {
                this.changeViewState(ViewState.SAVE_SUCCESS);
            },
            error: (err) => {
                console.error(err);
                this.changeViewState(ViewState.SAVE_ERROR);
            },
        });
    }

    initAdd() {
        this.producerTitle = "Nowy poducent";
    }

    initEdit() {
        this.changeViewState(ViewState.LOAD_ATTEMPT);
        this.producersService.get(this.producerID).subscribe({
            next: (data) => {
                this.producerForm.setValue(this.formService.prepareFormDataFromPacket(data));
                this.producerTitle = data.name;
                this.changeViewState(ViewState.LOAD_SUCCESS);
            },
            error: (err) => {
                console.error(err);
                this.changeViewState(ViewState.LOAD_ERROR);
            },
        });
    }
}
