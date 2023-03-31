import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { Packet } from "../packets.service";

export enum PacketFCN {
    NAME = "name",
    DESC = "desc",
    NAME_POLISH = "name_polish",
    NAME_LATIN = "name_latin",
    PRODUCER_ID = "producer_id",
    EXPIRATION_DATE = "expiration_date",
    PURCHASE_DATE = "purchase_date",
    IMAGE_FRONT = 'image_front',
    IMAGE_FRONT_NAME = 'image_front_name',
    IMAGE_BACK = 'image_back',
    IMAGE_BACK_NAME = 'image_back_name',
}

@Injectable({
    providedIn: "root",
})
export class FormPacketService {
    constructor(private formBuilder: FormBuilder) {}

    public initForm(): FormGroup {
        return this.formBuilder.group({
            [PacketFCN.NAME]: ["", [Validators.required, Validators.minLength(2)]],
            [PacketFCN.DESC]: ["", []],
            [PacketFCN.NAME_POLISH]: ["", []],
            [PacketFCN.NAME_LATIN]: ["", []],
            [PacketFCN.PRODUCER_ID]: ["", [Validators.required, Validators.min(1)]],
            [PacketFCN.EXPIRATION_DATE]: ["", [Validators.required]],
            [PacketFCN.PURCHASE_DATE]: ["", [Validators.required]],
            [PacketFCN.IMAGE_FRONT]: [""],
            [PacketFCN.IMAGE_FRONT_NAME]: [""],
            [PacketFCN.IMAGE_BACK]: [""],
            [PacketFCN.IMAGE_BACK_NAME]: [""],
        });
    }

    prepareFormDataFromPacket(data: Packet) {
        return {
            [PacketFCN.NAME]: data.name,
            [PacketFCN.DESC]: data.desc,
            [PacketFCN.NAME_POLISH]: data.name_polish,
            [PacketFCN.NAME_LATIN]: data.name_latin,
            [PacketFCN.PRODUCER_ID]: data.producer_id,
            [PacketFCN.EXPIRATION_DATE]: moment(data.expiration_date, "YYYY.MM.DD"),
            [PacketFCN.PURCHASE_DATE]: moment(data.purchase_date, "YYYY.MM.DD"),
        };
    }

    preparePacketFromFormData(form: FormGroup): Packet {
        return {
            name: form.controls[PacketFCN.NAME].value,
            desc: form.controls[PacketFCN.DESC].value,
            name_polish: form.controls[PacketFCN.NAME_POLISH].value,
            name_latin: form.controls[PacketFCN.NAME_LATIN].value,
            producer_id: form.controls[PacketFCN.PRODUCER_ID].value,
            expiration_date: form.controls[PacketFCN.EXPIRATION_DATE].value.format("YYYY.MM.DD"),
            purchase_date: form.controls[PacketFCN.PURCHASE_DATE].value.format("YYYY.MM.DD"),
        };
    }
}
