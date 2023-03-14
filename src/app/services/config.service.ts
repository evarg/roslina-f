import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

public API_URI : string = "http://api.roslina.com.pl/api/";

  constructor() { }
}
