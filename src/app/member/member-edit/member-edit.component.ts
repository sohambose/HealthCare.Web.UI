import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  memberDetailsForm: FormGroup;

  constructor(private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.memberDetailsForm = new FormGroup({
      'personaldetails': new FormGroup({
        'membername': new FormControl(null, Validators.required),
        'dob': new FormControl(null, Validators.required),
        'gender': new FormControl('male'),
        'contact_no': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required)
      }),
      'medicaldetails': new FormGroup({
        'blood_group': new FormControl(null)
      })
    });
  }

  OnSubmit() {
    alert('submit');
    alert(this.memberDetailsForm.value.personaldetails.membername);
    console.log(this.memberDetailsForm);
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
