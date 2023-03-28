import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ForgotPasswordsCredencials } from "./forms/forgot-password.service";
import { ResetCredencials } from "./forms/reset-password.service";

export interface LoginCredencials {
    email: string;
    password: string;
}

export interface LoginResponse {
    email: string;
    password: string;
}

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private router: Router, private http: HttpClient) {}

    canActivate() {
        if (this.loggedIn()) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }

    loginToAPI(data: LoginCredencials): Observable<any> {
        return this.http.post(environment.apiUrl + "login", data);
    }

    resetPassword(data: ResetCredencials): Observable<any> {
        return this.http.post(environment.apiUrl + "reset_password", data);
    }

    forgotPassword(data: ForgotPasswordsCredencials): Observable<any> {
        let url = environment.apiUrl + 'reset_password?email=' + data.email
        url += '&url=' + environment.baseUrl + 'reset-password/:token/:email'
        console.warn(url)
        return this.http.get(url);
    }

    setLogin(token: string) {
        localStorage.setItem("id_token", token);
    }

    setLogout() {
        //localStorage.setItem("id_token", "");
        localStorage.removeItem("id_token");
        this.router.navigate(["/login"]);
    }

    loggedIn() {
        if (localStorage.getItem("id_token") != null) return true;
        else return false;
    }
}
