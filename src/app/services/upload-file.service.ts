import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConfigService } from "./config.service";
import { environment } from "src/environments/environment";

export interface FileU {
    id?: number;
    name: string;
    org_name: string;
    file_name: string;
    desc?: string;
    mime: string;
    size: number;
    created_at?: string;
    updated_at?: string;
}

@Injectable({
    providedIn: "root",
})
export class FileUploadService {
    constructor(private http: HttpClient) {}

    upload(image: File): Observable<any[]> {
        const formData: FormData = new FormData();
        formData.append("name", "Nazwa pliku");
        formData.append("image", image, image.name);

        return this.http.post<any[]>(environment.apiUrl + "files", formData, {
            reportProgress: true,
            responseType: "json",
        });
    }
}
