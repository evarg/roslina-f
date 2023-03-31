import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewState } from "src/app/enums/view-state";
import { FormPacketService, PacketFCN } from "src/app/services/forms/form-packet.service";
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

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private packetsService: PacketsService,
        private producersService: ProducersService,
        private formService: FormPacketService,
    ) {}

    ngOnInit(): void {
        this.packetForm = this.formService.initForm();
        this.prepareProducersSelect(7);
    }

    onBack(): void {
        this.viewState = ViewState.CLOSE;
        this.router.navigate(["/"]);
    }

    onSave() {
        this.viewState = ViewState.SAVE_ATTEMPT;
        this.packetsService.create(this.formService.preparePacketFromFormData(this.packetForm)).subscribe({
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

    private prepareProducersSelect(producerID: number): void {

        let p: Producer = {
            id: 100,
            name: 'ddd',
            desc: 'asdfasd',
            country: 'rumunia'
        }
        this.producersService.list().subscribe((producersData) => {
            this.loadedProducers = producersData;
            //this.loadedProducers = [p];
            //this.packetForm.get(PacketFCN.PRODUCER_ID)?.setValue(producerID);
        });
    }
}
