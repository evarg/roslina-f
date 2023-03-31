import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewState } from "src/app/enums/view-state";

import { FormPacketService, PacketFCN } from "src/app/services/forms/form-packet.service";
import { PacketsService } from "src/app/services/packets.service";
import { Producer, ProducersService } from "src/app/services/producers.service";
import { SnackBarService } from "src/app/services/snack-bar.service";

@Component({
    selector: "app-producers-edit",
    templateUrl: "./packets-edit.component.html",
    styleUrls: ["./packets-edit.component.scss"],
})
export class PacketsEditComponent implements OnInit {
    public packetID: number = 0;
    public packetForm: FormGroup;
    public packetTitle: string = "";
    public loadedProducers: Producer[];
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public PacketFCN: typeof PacketFCN = PacketFCN;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private packetsService: PacketsService,
        private producersService: ProducersService,
        private formService: FormPacketService,
        private statusSnackBarService: SnackBarService
    ) {}

    public changeViewState(viewState: ViewState) {
        this.viewState = viewState;
        this.statusSnackBarService.show(viewState);
    }

    ngOnInit(): void {
        this.packetID = this.route.snapshot.params["id"];
        this.packetForm = this.formService.initForm();

        if (this.packetID) this.initEdit();
        else this.initAdd();
    }

    onBack(): void {
        this.changeViewState(ViewState.CLOSE);
        this.router.navigate(["/packets"]);
    }

    onSave() {
        if (this.packetID) this.saveEdit();
        else this.saveAdd();
    }

    initAdd() {
        this.packetTitle = "Nowy pakiet";
        this.prepareProducersSelect(0);
    }

    saveAdd() {
        // this.changeViewState(ViewState.SAVE_ATTEMPT);
        // this.packetsService.create(this.formService.preparePacketFromFormData(this.packetForm)).subscribe({
        //     next: (data) => {
        //         this.changeViewState(ViewState.SAVE_SUCCESS);
        //         this.router.navigate(["/packets/edit/" + data.id]);
        //     },
        //     error: (err) => {
        //         console.error(err);
        //         this.changeViewState(ViewState.SAVE_ERROR);
        //     },
        // });
    }

    initEdit() {
        this.changeViewState(ViewState.LOAD_ATTEMPT);
        this.packetsService.get(this.packetID).subscribe({
            next: (data) => {
                this.packetForm.setValue(this.formService.prepareFormDataFromPacket(data));
                this.prepareProducersSelect(data.producer_id);
                this.packetTitle = data.name;
                this.changeViewState(ViewState.LOAD_SUCCESS);
            },
            error: (err) => {
                console.error(err);
                this.changeViewState(ViewState.LOAD_ERROR);
            },
        });
    }

    saveEdit() {
        this.changeViewState(ViewState.SAVE_ATTEMPT);
        this.packetsService.modify(this.packetID, this.formService.preparePacketFromFormData(this.packetForm)).subscribe({
            next: (data) => {
                this.changeViewState(ViewState.SAVE_SUCCESS);
                this.router.navigate(["/packets/edit/" + data.id]);
            },
            error: (err) => {
                console.error(err);
                this.changeViewState(ViewState.SAVE_ERROR);
            },
        });
    }

    private prepareProducersSelect(producerID: number): void {
        this.producersService.list().subscribe((producersData) => {
            this.loadedProducers = producersData;
            this.packetForm.get(PacketFCN.PRODUCER_ID)?.setValue(producerID);
        });
    }
}
