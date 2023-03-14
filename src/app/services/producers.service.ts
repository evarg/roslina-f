import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";
import { Packet } from "./packets.service";

export interface Producer {
    id?: number;
    name: string;
    desc: string;
    country: string;
    packets?: Packet[];
    created_at?: string;
    updated_at?: string;
}

@Injectable({
    providedIn: "root",
})
export class ProducersService {
    constructor(private http: HttpClient, private config: ConfigService) {}

    list(): Observable<Producer[]> {
        return this.http.get<Producer[]>(this.config.API_URI + "producers");
    }

    create(data: Producer): Observable<Producer> {
        return this.http.post<Producer>(this.config.API_URI + "producers", data);
    }

    modify(id: number, data: Producer): Observable<Producer> {
        return this.http.put<Producer>(this.config.API_URI + "producers/" + id, data);
    }

    get(id: number): Observable<Producer> {
        return this.http.get<Producer>(this.config.API_URI + "producers/" + id);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.config.API_URI + "producers/" + id);
    }
}
