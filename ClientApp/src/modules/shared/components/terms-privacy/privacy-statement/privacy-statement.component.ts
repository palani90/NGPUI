import { Component, OnInit } from '@angular/core';
import { AuthConfig } from 'src/modules/shared/models/authconfig';

@Component({
  selector: 'app-privacy-statement',
  templateUrl: './privacy-statement.component.html',
  styleUrls: ['./privacy-statement.component.scss']
})
export class PrivacyStatementComponent implements OnInit {
  isValidUser = false;
  

  ngOnInit(): void {
    if (AuthConfig.userInfo && AuthConfig.userInfo.status == 'Active') {
      this.isValidUser = true;
    }
    else {
      this.isValidUser = false;
    }
    window.scroll(0, 0)
    const windowScroll: HTMLElement = document.querySelector('header.c-header');
    if (windowScroll) {
      windowScroll.style.top = "0px";
  
  }
  }
 
  navigateTo(linkName: string) {
    let link = '';
    switch (linkName) {
      case 'privacy-policy':
        link = 'https://www.accenture.com/us-en/about/privacy-policy';
        break;
      case 'binding-corporate-rules':
        link = 'https://www.accenture.com/us-en/about/binding-corporate-rules';
        break;
      case 'cookie-definitions':
        link = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/cookie-definitions';
        break;
      case 'similar-technology':
        link = 'https://www.accenture.com/us-en/support/company-cookies-similar-technology';
        break;
    }
    if (link) {
      window.open(link, '_blank');
    }
  }


}
