import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {  GETHELP_CONTACT_SUPPORT, GET_HELP } from '../../config/app-constants';
import { AuthConfig } from '../../models/authconfig';
import { FeedbackComponent } from '../feedback/feedback.component';
import { CustomOverlay } from '../../custom-overlay/custom-overlay/custom-overlay.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year: number;
  getHelp: any = GET_HELP;
  isShowcaseInstance = AuthConfig.showcaseInstance;
  isTransformInstance = AuthConfig.transformInstance;
  showToastMessage: boolean = false;

  constructor(
    public router: Router,
    private overlay: CustomOverlay
    ) { }

  ngOnInit() {
    const d = new Date();
    this.year = d.getFullYear();
  }
  
  goToTermsAndPrivacy(data: any) {
    if (AuthConfig.transformInstance && AuthConfig.workspaceUrl !== '') {
      if (data == 'termsofuse') {
        window.open(environment.transformURL + "/termsofuse/" + AuthConfig.workspaceUrl, '_blank');
      }
      else if (data == 'privacystatement') {
        window.open(environment.transformURL + "/privacystatement/" + AuthConfig.workspaceUrl, '_blank');
      }
    }
    if (AuthConfig.showcaseInstance && AuthConfig.workspaceUrl === '') {
      if (data == 'termsofuse') {
        window.open(environment.showcaseURL + "/termsofuse", '_blank');
      }
      else if (data == 'privacystatement') {
        window.open(environment.showcaseURL + "/privacystatement", '_blank');
      }
    }
    if (!AuthConfig.showcaseInstance && !AuthConfig.transformInstance) {
      if (data == 'termsofuse') {
        this.router.navigate(['/termsofuse'])
      }
      else if (data == 'privacystatement') {
        this.router.navigate(['/privacystatement'])
      }
    }
  }

  openFeedback() {
    // this.preventrouteService.lock = false;
    const feedbackOverlay = this.overlay.open({
      component: FeedbackComponent,
      data: {},
      position: 'center',
      options: {
        hasBackdrop: true,
        backdropClass: ['visible'],
        preventBackdropClick: true,
        panelClass: ['c-vc-selected']
      }
    });
    feedbackOverlay.afterClosed.subscribe((res: any) => {
      if(res.data.state) {
        this.showToastMessage = true;
        setTimeout(() => {
         if (this.showToastMessage) {
           this.showToastMessage = false;
         }
       }, 5000);
      }   
    });
  }

  redirectTo(type: string) {
    if (type == 'getHelp') {
      window.open(this.getHelp, '_blank');
    }
    else if (type == 'FAQ') {
      window.open(environment.faqUrl, '_blank');

    }
    else if (type == 'trainingLink') {
      window.open(environment.myIndustryURL, '_blank');
    }
  }
  
}
