import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomDialogService, Dialog } from 'src/app/commonServices/customdialogbox.service';


@Component({
  selector: 'app-alertpopup',
  templateUrl: './alertpopup.component.html',
  styleUrls: ['./alertpopup.component.css']
})
export class AlertpopupComponent implements OnInit {
  dialogText: string;


  constructor(private customDialogService: CustomDialogService) { }

  ngOnInit() {
    this.customDialogService.TextSubject.subscribe(text => {
      this.dialogText = text;
    })
  }

  onClickYes() {
    this.customDialogService.responseSubject.next(true);
    this.dialogText = '';
  }

  onClickNo() {
    this.customDialogService.responseSubject.next(false);
    this.dialogText = '';
  }

}
