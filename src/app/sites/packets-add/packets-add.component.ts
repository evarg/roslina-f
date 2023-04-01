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
        //this.router.navigate(["/"]);
        console.log(this.imageFront);
        console.log(this.imageBack);
    }

    onSave() {
        this.viewState = ViewState.SAVE_ATTEMPT;
        let credencials = this.formService.preparePacketFromFormData(this.packetForm)

        let clientheaders = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });

        const formData = new FormData();
        formData.append('image_front', this.imageFront);
        formData.append('image_back', this.imageBack);
        formData.append('name', this.packetForm.controls[PacketFCN.NAME].value);
        formData.append('desc', this.packetForm.controls[PacketFCN.DESC].value);
        formData.append('name_polish', this.packetForm.controls[PacketFCN.NAME_POLISH].value);
        formData.append('name_latin', this.packetForm.controls[PacketFCN.NAME_LATIN].value);
        formData.append('producer_id', this.packetForm.controls[PacketFCN.PRODUCER_ID].value);
        formData.append('expiration_date', this.packetForm.controls[PacketFCN.EXPIRATION_DATE].value.format("YYYY.MM.DD"));
        formData.append('purchase_date', this.packetForm.controls[PacketFCN.PURCHASE_DATE].value.format("YYYY.MM.DD"));

       //let formData: any = [];

        this.packetsService.create(formData).subscribe({
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
