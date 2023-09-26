import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig } from '../../models/authconfig';

@Component({
  selector: 'app-terms-privacy',
  templateUrl: './terms-privacy.component.html',
  styleUrls: ['./terms-privacy.component.scss']
})
export class TermsPrivacyComponent implements OnInit {
  pageType: any = '';
  workspaceUrl: any;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.workspaceUrl = '';
    if (AuthConfig.clientObj && AuthConfig.clientObj.workspaceUrl) {
      this.workspaceUrl = AuthConfig.clientObj.workspaceUrl;
    }
    if (this.router.url.includes("/privacystatement")) {
      this.pageType = "privacystatement";
    }
    else if (this.router.url.includes("/termsofuse")) {
      this.pageType = "termsofuse";
    }

  }


}
