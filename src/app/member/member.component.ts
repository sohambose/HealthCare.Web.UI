import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAddNewMember(){
    this.router.navigate(['new'],{relativeTo:this.activatedRoute});
  }

}
