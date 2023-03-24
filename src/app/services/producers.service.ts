import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
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
    constructor(private http: HttpClient) {}

    list(): Observable<Producer[]> {
        return this.http.get<Producer[]>(environment.apiUrl + "producers");
    }

    create(data: Producer): Observable<Producer> {
        return this.http.post<Producer>(environment.apiUrl + "producers", data);
    }

    modify(id: number, data: Producer): Observable<Producer> {
        return this.http.put<Producer>(environment.apiUrl + "producers/" + id, data);
    }

    get(id: number): Observable<Producer> {
        const auth_token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcm9zbGluYS1iLnBvbGlnb24vYXBpL2xvZ2luIiwiaWF0IjoxNjc5NDk3NjY3LCJleHAiOjE2Nzk1MDEyNjcsIm5iZiI6MTY3OTQ5NzY2NywianRpIjoiWUJMTWwwWHdsSVRRRzhLRCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.a5Ndbnw07ZwBzrAUYfzAQpLMjx-QRuNT4Ns2OTMnl5I";
        const opt = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth_token}`,
            },
        };
        //          return this.http.get<Producer>(environment.apiUrl + "producers/" + id, { headers: headers });
        return this.http.get<Producer>(environment.apiUrl + "producers/" + id, opt);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(environment.apiUrl + "producers/" + id);
    }
}
