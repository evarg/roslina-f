import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { Packet } from "../packets.service";

export enum PacketFCN {
    NAME = "name",
    DESC = "desc",
    NAME_POLISH = "name_polish",
    NAME_LATIN = "name_latin",
    PRODUCER_ID_MODE = "producer_id_mode",
    PRODUCER_ID = "producer_id",
    EXPIRATION_DATE_MODE = "expiration_date_mode",
    EXPIRATION_DATE = "expiration_date",
    PURCHASE_DATE_MODE = "purchase_date_mode",
    PURCHASE_DATE = "purchase_date",
    IMAGE_FRONT = "image_front",
    IMAGE_FRONT_NAME = "image_front_name",
    IMAGE_BACK = "image_back",
    IMAGE_BACK_NAME = "image_back_name",
}

@Injectable({
    providedIn: "root",
})
export class FormPacketService {
    private formInstance: FormGroup;
    constructor(private formBuilder: FormBuilder) {
        this.formInstance = this.formBuilder.group({
            [PacketFCN.NAME]: ["", [Validators.required, Validators.minLength(2)]],
            [PacketFCN.DESC]: ["", []],
            [PacketFCN.NAME_POLISH]: ["", []],
            [PacketFCN.NAME_LATIN]: ["", []],

            [PacketFCN.PRODUCER_ID_MODE]: [true],
            [PacketFCN.PRODUCER_ID]: [{ value: "", disabled: true }, [Validators.required, Validators.min(1)]],

            [PacketFCN.EXPIRATION_DATE_MODE]: [true],
            [PacketFCN.EXPIRATION_DATE]: [{ value: "", disabled: true }, [Validators.required]],

            [PacketFCN.PURCHASE_DATE_MODE]: [true],
            [PacketFCN.PURCHASE_DATE]: [{ value: "", disabled: true }, [Validators.required]],

            [PacketFCN.IMAGE_FRONT]: [""],
            [PacketFCN.IMAGE_FRONT_NAME]: [""],
            [PacketFCN.IMAGE_BACK]: [""],
            [PacketFCN.IMAGE_BACK_NAME]: [""],
        });
    }

    public initForm(): FormGroup {
        return this.formInstance;
    }

    public setProducerMode(mode: boolean) {
        if (mode) {
            this.formInstance.controls[PacketFCN.PRODUCER_ID].enable();
            this.formInstance.controls[PacketFCN.PRODUCER_ID].setValidators(Validators.required);
            this.formInstance.controls[PacketFCN.PRODUCER_ID].updateValueAndValidity();
        } else {
            this.formInstance.controls[PacketFCN.PRODUCER_ID].setErrors(null);
            this.formInstance.controls[PacketFCN.PRODUCER_ID].clearValidators();
            this.formInstance.controls[PacketFCN.PRODUCER_ID].updateValueAndValidity();
            this.formInstance.controls[PacketFCN.PRODUCER_ID].disable();
        }
    }

    public setExpirationDateMode(mode: boolean) {
        if (mode) {
            this.formInstance.controls[PacketFCN.EXPIRATION_DATE].enable();
            this.formInstance.controls[PacketFCN.EXPIRATION_DATE].setValidators(Validators.required);
            this.formInstance.controls[PacketFCN.EXPIRATION_DATE].updateValueAndValidity();
        } else {
            this.formInstance.controls[PacketFCN.EXPIRATION_DATE].setErrors(null);
            this.formInstance.controls[PacketFCN.EXPIRATION_DATE].clearValidators();
            this.formInstance.controls[PacketFCN.EXPIRATION_DATE].updateValueAndValidity();
            this.formInstance.controls[PacketFCN.EXPIRATION_DATE].disable();
        }
    }

    public setPurchaseDateMode(mode: boolean) {
        if (mode) {
            this.formInstance.controls[PacketFCN.PURCHASE_DATE].enable();
            this.formInstance.controls[PacketFCN.PURCHASE_DATE].setValidators(Validators.required);
            this.formInstance.controls[PacketFCN.PURCHASE_DATE].updateValueAndValidity();
        } else {
            this.formInstance.controls[PacketFCN.PURCHASE_DATE].setErrors(null);
            this.formInstance.controls[PacketFCN.PURCHASE_DATE].clearValidators();
            this.formInstance.controls[PacketFCN.PURCHASE_DATE].updateValueAndValidity();
            this.formInstance.controls[PacketFCN.PURCHASE_DATE].disable();
        }
    }

    prepareAPIFormData() {
        const c = this.formInstance.controls;
        let formData = new FormData();
        formData.append(PacketFCN.NAME, c[PacketFCN.NAME].value);
        formData.append(PacketFCN.DESC, c[PacketFCN.DESC].value);
        formData.append(PacketFCN.NAME_POLISH, c[PacketFCN.NAME_POLISH].value);
        formData.append(PacketFCN.NAME_LATIN, c[PacketFCN.NAME_LATIN].value);

        if (!c[PacketFCN.PRODUCER_ID_MODE].value) {
            formData.append(PacketFCN.PRODUCER_ID, c[PacketFCN.PRODUCER_ID].value);
        }

        if (!c[PacketFCN.EXPIRATION_DATE_MODE].value) {
            formData.append(PacketFCN.EXPIRATION_DATE, c[PacketFCN.EXPIRATION_DATE].value.format("YYYY.MM.DD"));
        }

        if (!c[PacketFCN.PURCHASE_DATE_MODE].value) {
            formData.append(PacketFCN.PURCHASE_DATE, c[PacketFCN.PURCHASE_DATE].value.format("YYYY.MM.DD"));
        }

        return formData
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
