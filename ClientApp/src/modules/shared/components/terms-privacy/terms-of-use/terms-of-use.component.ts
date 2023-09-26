import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthConfig } from 'src/modules/shared/models/authconfig';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {

  isExternalUser = false;
  isValidUser = false;



  ngOnInit(): void {
    if (AuthConfig.userInfo && AuthConfig.userInfo.status == 'Active') {
      this.isValidUser = true;
    }
    else {
      this.isValidUser = false;
    }
    if (AuthConfig.userInfo) {
      this.isExternalUser = AuthConfig.userInfo.isExternalUser;
    }
    else {
      this.isExternalUser = false;
    }
    window.scroll(0, 0)
    const windowScroll: HTMLElement = document.querySelector('header.c-header');
    if (windowScroll) {
      windowScroll.style.top = "0px";
    }
  }

  goToExternalPrivacyStatement(){
    window.open(environment.redirectUri+"/privacystatement",'_blank');
  }

}
