import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterCredencials } from './forms/register-login.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private router: Router, private http: HttpClient) { }

  register(data: RegisterCredencials): Observable<any> {
    return this.http.post(environment.apiUrl + "register", data);
}
}
