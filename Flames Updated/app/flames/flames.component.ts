import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { take, finalize } from 'rxjs/operators';
import { User } from "../shared/user.model";
import { UserService } from "../shared/user.service";

@Component({
    selector: "app-flames",
    moduleId: module.id,
    templateUrl: "./flames.component.html",
    styleUrls: ['./flames.component.css']
})
export class FlamesComponent {
    isChecking = true;
    user: User;
    processing = false;
    @ViewChild("othersName", { static: false }) othersName: ElementRef;

    constructor(private page: Page, private userService: UserService, private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
        this.user = new User();
        this.user.yourName = "";
        this.user.othersName = "";
    }

    toggleForm() {
        this.isChecking = !this.isChecking;
    }

    check() {
        if (!this.user.yourName || !this.user.othersName) {
            if (this.user.yourName === this.user.othersName) {
                this.alert("Please provide differnt names to calculate.");
            } else {
                this.alert("Please provide both names to calculate.");
            }
            return;
        }

        this.processing = true;
        if (this.isChecking) {
            this.calculateFlames();
        }
    }


    calculateFlames() {
        this.userService.checkFlames(this.user)
            .pipe(
                take(1),
            ).subscribe((value: string) => {
                this.alert("Relation is : " + value).then(() => {
                    this.processing = false;
                    this.routerExtensions.navigate(["/home"], { clearHistory: true });
                });
            });
    }

    focusOthersName() {
        this.othersName.nativeElement.focus();
    }

    alert(message: string) {
        return alert({
            title: "F.L.A.M.E.S",
            okButtonText: "OK",
            message: message,
        });
    }
}