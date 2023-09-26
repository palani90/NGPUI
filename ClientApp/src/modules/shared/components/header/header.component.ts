import { Component, OnInit, HostListener } from '@angular/core';

import { HEADER_IMAGE, INDUSTRYX_LOGO } from '../../config/app-constants';

import { Router } from '@angular/router';
import { AuthConfig } from '../../../shared/models/authconfig';
import { DomSanitizer, EventManager } from '@angular/platform-browser';
import { UseCaseViewService } from '../../services/usecaseView.service';
import { environment } from 'src/environments/environment';
import { CustomOverlay } from '../../custom-overlay/custom-overlay/custom-overlay.service';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  HeaderPath = HEADER_IMAGE;
  IndustryXLogo = INDUSTRYX_LOGO;
  userName = '';
  photo: any;
  userInitial: any = [];
  headersticky = false;
  headerfullpath = '';
  isRetry: any = 0;
  dialogRef: any;
  isProfileImageError = false;
  isExpand = false;
  clientLogo: any = '';
  isSessionExpired = false;
  title: string;
  description: string;
  confirmationPopup = false;
  showPopup: boolean;
  headerSibling: any;
  isloading = false;
  isExternalUser: boolean = false;
  isShowcaseEnabled = environment.isShowcaseEnabled;
  preventrouteService: any;
  showToastMessage: boolean = false;

  constructor(
    private domSanitizer: DomSanitizer,
    private router: Router,
    public usecaseViewService: UseCaseViewService,
    private eventManager: EventManager,
    private overlay: CustomOverlay
  ) {}
  ngOnInit() {
   

    if (AuthConfig.userInfo) {
      this.isExternalUser = AuthConfig.userInfo.isExternalUser;
    } else {
      this.isExternalUser = false;
    }

    this.userName = AuthConfig.UserProfile || '';
    const userName = this.userName;
    this.photo = this.usecaseViewService.userImage;
    if (!this.photo) this.isProfileImageError = true;
    else this.isProfileImageError = false;

    if (userName.includes(',')) {
      this.userInitial = userName.split(',');
      if (this.userInitial.length == 1) {
        this.userInitial = userName.split(' ');
      }
      const lastname =
        this.userInitial[1].charAt(0) == ' '
          ? this.userInitial[1].charAt(1)
          : this.userInitial[1].charAt(0);
      this.userInitial = this.userInitial[0].charAt(0) + lastname;
    } else {
      this.userInitial = userName;
      this.userInitial =
        this.userInitial.charAt(0) + this.userInitial.charAt(1);
    }
  }

  getCurrentScrollPosition() {
    return window.scrollY || document.getElementsByTagName('html')[0].scrollTop;
  }

  updateUrl(error: any) {
    if (this.isRetry != 1) {
      this.isRetry = this.isRetry + 1;
    } else if (error.type && error.type == 'error') {
      this.headerfullpath =
        location.origin + '/assets/toolkit/images/pngs/petrofac.png';
    }
  }
  popupActionClick(event) {
    window.close();
  }

  logOut() {
    window.close();
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

  getProfileImages() {
    return this.usecaseViewService.userImage;
  }

  redirectToShowcase() {
    this.isloading = false;
    if(this.isShowcaseEnabled && !this.isExternalUser){
    window.open(environment.showcaseCLientURL, '_blank');
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const floatBar = document.querySelector('.c-header__float-bar');
    const childrenCount = floatBar ? floatBar.childElementCount : 0;
    if (childrenCount > 0) {
      this.headersticky = true;
    }
  }
}
