import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-errormodaldailog',
  templateUrl: './errormodaldailog.component.html',
  styleUrls: ['./errormodaldailog.component.scss']
})
export class ErrormodaldailogComponent implements OnInit {
  showPopup = false;
  constructor(public modalDialog: MatDialogRef<ErrormodaldailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.showPopup = true;
  }
  clickclose(event) {
    if (event.target.id == 'ok')
      this.modalDialog.close({ event: 'ok' });
    else {
      this.modalDialog.close({ event: 'cross' });
      this.showPopup = false;
    }
  }
}
