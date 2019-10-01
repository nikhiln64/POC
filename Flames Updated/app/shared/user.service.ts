import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Observable, of } from 'rxjs';

enum Flames {
    F = 'FRIENDS',
    L = 'LOVE',
    A = 'AFFAIR',
    M = 'MARRIAGE',
    E = 'ENEMIES',
    S = 'SIBLINGS',
}

@Injectable()
export class UserService {
    checkFlames(user: User): Observable<string> {
        const textVal1 = user.yourName.trim();
        const textVal2 = user.othersName.trim();
        const cutOffCount = this.removeCommonLetters(textVal1.toLocaleLowerCase(), textVal2.toLocaleLowerCase());
        return of(this.findRelation("FLAMES", cutOffCount));
    }

    private removeCommonLetters(textVal1: string, textVal2: string): number {
        const fristStringArray = textVal1.split('');
        const secondStringArray = textVal2.split('');
        let count = 0;
        fristStringArray.forEach((elem) => {
            if (secondStringArray.indexOf(elem) !== -1) {
                count++;
                secondStringArray.splice(secondStringArray.indexOf(elem), 1);
            }
        });
        return (fristStringArray.length + secondStringArray.length) - count;
    }

    private findRelation(flames: string, cutOffCount: number): string {
        while (flames.length >= 2) {
            let j = 0;
            const process = [];
            const position = cutOffCount % flames.length;
            if (position !== 0) {
                for (let i = position; i <= flames.length; i++) {
                    process[j] = flames.charAt(i);
                    j++;
                }
                for (let i = 0; i <= position - 2; i++) {
                    process[j] = flames.charAt(i);
                    j++;
                }
                flames = process.toString().replace(/,/gi, '');
            } else {
                flames = flames.slice(0, -1);
            }
        }
        return Flames[flames];
    }
}
