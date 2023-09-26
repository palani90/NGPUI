import { Component, Inject, OnInit } from '@angular/core';
import { CONTACT_SUPPORT } from '../../config/app-constants';
import { CUSTOM_OVERLAY_DATA } from '../../custom-overlay/custom-overlay/custom-overlay';
import { CustomOverlayRef } from '../../custom-overlay/custom-overlay/custom-overlay-ref';

@Component({
  selector: 'app-confidentiality-popup',
  templateUrl: './confidentiality-popup.component.html',
  styleUrls: ['./confidentiality-popup.component.css']
})
export class ConfidentialityPopupComponent implements OnInit {
  title: string;
  AssetName = 'Intelligent Engineering and Manufacturing Platform';
  AssetPoCEmailId: string;
  EmailBodyText: string = 'Hi, %0A%0AI have the below query, could you please help on this %0A%0A[TYPE YOUR QUERY HERE]';
  emailData: string;
  contactSupportInfo: any = CONTACT_SUPPORT;

  constructor(private overlayRef: CustomOverlayRef, @Inject(CUSTOM_OVERLAY_DATA) public data: any) {}

  ngOnInit(): void {}

  closedialog() {
    this.overlayRef.close();
  }
  openmail() {
    this.AssetPoCEmailId = this.contactSupportInfo.toEmail;
    this.emailData =
      'mailto:confidentiality@accenture.com' +
      '?cc=' +
      this.AssetPoCEmailId +
      '&body=' +
      this.EmailBodyText +
      '&subject=Confidential Information Query (' +
      this.AssetName +
      ')';
    window.location.href = this.emailData;
  }
}
