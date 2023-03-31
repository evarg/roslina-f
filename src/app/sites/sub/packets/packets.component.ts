import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewState } from "src/app/enums/view-state";
import { SearchPacketFCN, SearchPacketService } from "src/app/services/forms/search-packet.service";
import { Packet, PacketsService } from "src/app/services/packets.service";

@Component({
    selector: "app-packets",
    templateUrl: "./packets.component.html",
    styleUrls: ["./packets.component.scss"],
})
export class PacketsComponent implements OnInit {
    public searchPacketForm: FormGroup;
    public viewState: ViewState = ViewState.LOADING;
    public ViewState: typeof ViewState = ViewState;
    public SearchPacketFCN: typeof SearchPacketFCN = SearchPacketFCN;
    public dataSource: any = new MatTableDataSource<Packet>([]);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private formService: SearchPacketService,
        private packetsService: PacketsService
    ) {}

    ngOnInit(): void {
        this.searchPacketForm = this.formService.initForm();

        this.viewState = ViewState.LOAD_ATTEMPT;

        this.packetsService.list().subscribe({
          next: (data) => {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            console.log("🚀 ~ file: packets.component.ts:33 ~ PacketsComponent ~ this.packetsService.list ~ this:", this.dataSource)
            //this.dataSource.paginator = this.paginator;
            //this.dataSource.sort = this.sort;
            this.viewState = ViewState.LOAD_SUCCESS;
          },
          error: (err) => {
            console.error(err);
            this.viewState = ViewState.LOAD_ERROR;
          },
        });
    }

    onSearch() {
        // this.viewState = ViewState.SAVE_ATTEMPT;
        // this.packetsService.create(this.formService.preparePacketFromFormData(this.packetForm)).subscribe({
        //     next: (data) => {
        //         this.viewState = ViewState.SAVE_SUCCESS;
        //         //this.router.navigate(["/packets/edit/" + data.id]);
        //     },
        //     error: (err) => {
        //         console.error(err);
        //         this.viewState = ViewState.SAVE_ERROR;
        //     },
        // });
    }

    onRefresh() {
        console.log("onRefresh:", this.dataSource._renderData._value)
    }

}
