import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
    public loggedIn = false;
    public notLoggedIn = true;

    toggleStatus = true;
    z1 = false;
    z2 = true;

    constructor(private authService: AuthService, public router: Router) {}

    onMenuZ1() {
        this.z1 = !this.z1;
        console.log("menu z1");
    }

    onMenuZ2() {
        this.z2 = !this.z2;
        console.log("menu z2");
    }

    ngOnInit(): void {
        this.loggedIn = this.authService.loggedIn();
    }

    onLogout() {
        this.authService.setLogout();
        this.router.navigate([""]);
        this.ngOnInit();
    }
}
