import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";

@Injectable({
    providedIn: "root",
})
export class FileUploadService {
    constructor(private http: HttpClient, private config: ConfigService) {}

    upload(image: File): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append("name", "Nazwa pliku");
        formData.append("image", image, image.name);

        return this.http.post<any[]>(this.config.API_URI + "files", formData, {
            reportProgress: true,
            responseType: "json",
        });
    }
}
