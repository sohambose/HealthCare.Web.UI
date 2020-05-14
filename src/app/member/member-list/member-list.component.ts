import { Component, OnInit } from '@angular/core';
import { Member } from '../member.model';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  //---Inject the MemberService to get value from the Subject Observable
  constructor(private memberService: MemberService) { }

  arrMembers: Member[];

  ngOnInit(): void {
    this.memberService.arrmembersModified.subscribe(
      (arrMembersFromService: Member[]) => {
        this.arrMembers = arrMembersFromService;
      }
    );
  }

}
