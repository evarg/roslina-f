import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from './forms/form-login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private http: HttpClient) { }

  modify(id: number, data: UserData): Observable<UserData> {
    return this.http.put<UserData>(environment.apiUrl + "users/" + id, data);
}
}
