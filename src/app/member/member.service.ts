import { Injectable } from '@angular/core';
import { Member } from './member.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    constructor() { }

    private arrmembers: Member[] = [];

    arrmembersModified = new Subject<Member[]>();


    addMember(newMember: Member) {       
        this.arrmembers.push(newMember);  
        //-----Code to Save API Call---
        //-----------------------------      
        this.arrmembersModified.next(this.arrmembers.slice());
    }
}