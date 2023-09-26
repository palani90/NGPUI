import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CONTACT_SUPPORTEMAIL } from '../../config/app-constants';
import { AuthConfig } from '../../models/authconfig';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  currentYear = new Date().getFullYear();
  emailData:string;
  isloading = false;
  contactEmailSupport =  CONTACT_SUPPORTEMAIL;
  iconURL: string = environment.redirectUri + "/assets/images/svgs/page-not-found.svg";

  constructor(private router: Router) { }

  ngOnInit(): void {
    AuthConfig.transformInstance = false;
    AuthConfig.showcaseInstance = false;
  }

  goToTermsAndPrivacy(data: any) {
    if (data == 'termsofuse') {
      this.router.navigate(['/termsofuse'])
    }
    else if (data == 'privacystatement') {
      this.router.navigate(['/privacystatement'])
    }
  }

  ngAfterViewInit() {
    this.imageLoaded(this.iconURL);
  }

  imageLoaded(imageURL: any) {
    try {
      const img = new Image();
      img.src = imageURL;
      img.addEventListener('load', () => {
        this.isloading = false;
      });
    } catch
    {
      this.isloading = false;
      console.log("Error");
    }
  }
  
  contactSupport() {
    this.emailData = "mailto:" + this.contactEmailSupport.toEmail + "?subject=" + 'Support required : Invalid URL message shown';  
    window.location.href = this.emailData;
  }
}
