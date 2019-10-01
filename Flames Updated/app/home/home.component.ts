import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { UserService } from "../shared/user.service";

@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
    }

    flames() {
        this.routerExtensions.navigate(["/flames"], { clearHistory: true });
    }
}


