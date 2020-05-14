import { Injectable } from '@angular/core';
import { Subject, observable, Observable, BehaviorSubject } from 'rxjs';

export enum DialogType {
    confirm = 1,
    error = 2,
    info = 3,
    success = 4
}
export interface Dialog {
    text: string,
    type: number
}

@Injectable(
    {
        providedIn: 'root'
    }
)
export class CustomDialogService {
    TextSubject = new Subject<string>();
    responseSubject = new Subject<boolean>();

    showModal(Text: string) {
        this.EmitDialogText(Text);
    }

    EmitDialogText(message: string) {
        this.TextSubject.next(message);
    }
}