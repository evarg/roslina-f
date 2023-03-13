import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FileUploadService {
    private apiURL = "http://roslina-b.poligon/";

    constructor(private http: HttpClient) {}

    getFiles(): Observable<any> {
        return this.http.get(`${this.apiURL}/`);
    }

    upload(file: File): Observable<any> {
        const formData: FormData = new FormData();

        formData.append("image", file);

        //        const req = new HttpRequest("POST", `${this.baseUrl}`, formData, {
        //            reportProgress: true,
        //            responseType: "json",
        //        });

        // return this.http.get(this.apiURL + "files", formData, {
        //     reportProgress: true,
        //     responseType: "json",
        // });
        return this.http.get(this.apiURL + "packets");

        //        return this.http.request(req);
    }
}
