import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ConfigService {
    public API_URI: string = "http://roslina-b.poligon/api/";
    public API_IMAGE: string = "http://roslina-b.poligon/";
    //public API_URI: string = "http://api.roslina.com.pl/api/";
    //public API_IMAGE: string = "http://api.roslina.com.pl/";

    constructor() {}
}
