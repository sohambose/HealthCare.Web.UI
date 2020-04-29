import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';
import { Member } from '../member.model';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  memberDetailsForm: FormGroup;
  memberObj: Member = new Member();

  constructor(private router: Router,
    private activatedroute: ActivatedRoute,
    private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberDetailsForm = new FormGroup({
      'personaldetails': new FormGroup({
        'membername': new FormControl(null, Validators.required),
        'dob': new FormControl(null, Validators.required),
        'gender': new FormControl('male'),
        'contact_no': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required),
        'relationWithUser': new FormControl(null)
      }),
      'medicaldetails': new FormGroup({
        'blood_group': new FormControl(null)
      })
    });
  }

  OnSubmit() {
    this.memberObj = new Member();
    this.memberObj.membername = this.memberDetailsForm.value.personaldetails.membername;
    this.memberObj.dob = this.memberDetailsForm.value.personaldetails.dob;
    this.memberObj.contactNo = this.memberDetailsForm.value.personaldetails.contactNo;
    this.memberObj.gender = this.memberDetailsForm.value.personaldetails.gender;
    this.memberObj.bloodGroup = this.memberDetailsForm.value.personaldetails.bloodGroup;
    this.memberService.addMember(this.memberObj);
    this.memberDetailsForm.reset();
  }

  OnReset() {
    this.memberDetailsForm.reset();
  }

  onCancel() {
    if (this.memberDetailsForm.dirty) {
      if (confirm('Any unsaved information will be lost? Continue?')) {
        this.router.navigate(['/member']);
      }
    }
    else {
      this.router.navigate(['/member']);
    }
  }

}
