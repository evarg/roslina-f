import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewState } from "src/app/enums/view-state";
import { FormPacketService, PacketFCN } from "src/app/services/forms/form-packet.service";
import { ImageFCN } from "src/app/services/forms/image.service";
import { PacketsService } from "src/app/services/packets.service";
import { Producer, ProducersService } from "src/app/services/producers.service";

@Component({
    selector: "app-packets-add",
    templateUrl: "./packets-add.component.html",
    styleUrls: ["./packets-add.component.scss"],
})
export class PacketsAddComponent implements OnInit {
    public packetForm: FormGroup;
    public packetTitle: string = "";
    public loadedProducers: Producer[];
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public PacketFCN: typeof PacketFCN = PacketFCN;
    public ImageFCN: typeof ImageFCN = ImageFCN;

    public imageFront: File;
    public imageBack: File;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private packetsService: PacketsService,
        private producersService: ProducersService,
        private formService: FormPacketService
    ) {}

    ngOnInit(): void {
        this.packetForm = this.formService.initForm();
        this.prepareProducersSelect(7);
    }

    onBack(): void {
        this.viewState = ViewState.CLOSE;
        // this.formService.prepareAPIFormData().forEach((key,value)=>{
        //     console.log(value + '= ' + key)})
        this.router.navigate(["/"]);
    }

    onProducerChange(): void {
        this.formService.setProducerMode(!this.packetForm.controls[PacketFCN.PRODUCER_ID_MODE].value);
    }

    onExpirationDateChange(): void {
        this.formService.setExpirationDateMode(!this.packetForm.controls[PacketFCN.EXPIRATION_DATE_MODE].value);
    }

    onPurchaseDateChange(): void {
        this.formService.setPurchaseDateMode(!this.packetForm.controls[PacketFCN.PURCHASE_DATE_MODE].value);
    }

    onSave() {
        this.viewState = ViewState.SAVE_ATTEMPT;
        this.packetsService.create(this.formService.prepareAPIFormData()).subscribe({
            next: (data) => {
                this.viewState = ViewState.SAVE_SUCCESS;
                //this.router.navigate(["/packets/edit/" + data.id]);
            },
            error: (err) => {
                console.error(err);
                this.viewState = ViewState.SAVE_ERROR;
            },
        });
    }

    onFileSelectedFront(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;

        this.packetForm.controls[PacketFCN.IMAGE_FRONT_NAME].setValue(input.files[0].name);
        this.imageFront = input.files[0];
    }

    onFileSelectedBack(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;

        this.imageBack = input.files[0];
        this.packetForm.controls[PacketFCN.IMAGE_BACK_NAME].setValue(input.files[0].name);
    }

    private prepareProducersSelect(producerID: number): void {
        this.producersService.list().subscribe((producersData) => {
            this.loadedProducers = producersData;
        });
    }
}
