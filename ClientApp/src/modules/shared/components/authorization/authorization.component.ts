import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ALLOWED_STATUS_CODE,  CONTACT_SUPPORT_INACTIVEUSER, CONTACT_SUPPORT_MAIL, PROD_ENV } from '../../config/app-constants';
import { AuthConfig } from '../../models/authconfig';
import { UseCaseViewService } from '../../services/usecaseView.service';
@Component({
  selector: 'authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  contactSupportInfo: any = CONTACT_SUPPORT_MAIL;
  emailData: any = "";
  isloading = true;
  isImgloaded = false;
  isAccessRequested = false
  currentYear = new Date().getFullYear();
  isExternalUser = false;
  iconURL: string = location.origin + "/vco/assets/images/svgs/access-denied-home.svg";
  workspaceurl = '';
  status :string;
  isProd : boolean;
  template : string;

  constructor(private router: Router, private usecaseservice: UseCaseViewService) {

  }

  ngOnInit(): void {
    this.isProd = environment.buildMode == PROD_ENV ? true : false;  
    if (AuthConfig.userInfo && Object.keys(AuthConfig.userInfo).length) {
      this.isExternalUser = AuthConfig.userInfo.isExternalUser;
    }
    this.workspaceurl = AuthConfig.workspaceUrl;
    if (AuthConfig.userInfo && Object.prototype.hasOwnProperty.call(AuthConfig.userInfo, 'isExternalUser')) {
      this.isExternalUser = AuthConfig.userInfo.isExternalUser;
      this.status = AuthConfig.status;
      this.template = AuthConfig.template;
    }
    if (!this.workspaceurl) {
      if(AuthConfig.transformInstance) {
        this.router.navigate(['/pagenotfound']);
      } else {
        setTimeout(()=>{
          this.isloading = false;
        })
      }
    }
    else {
      if (
        this.status != 'UNAUTHORIZED' &&
        this.status != 'INACTIVE' &&
        ((!this.isExternalUser && this.template != 'ISTEMPLATENOTPUBLISHED') ||
          (this.isExternalUser &&
            this.template != 'ISTEMPLATEPPUBLISHED' &&
            this.template != 'ISTEMPLATENOTPUBLISHED' &&
            this.template != 'HASDEFAULTWORKSPACEACCESS'))
      ) {
      this.checkAccess();
    }
    else{
      this.isloading = false;
    }
    }
    AuthConfig.transformInstance = false;
    AuthConfig.showcaseInstance = false;
  }

  contactSupport() {
    if (AuthConfig.status && AuthConfig.status == 'INACTIVE' && !AuthConfig.userInfo.isExternalUser) {
      this.emailData = "mailto:" + this.contactSupportInfo.toEmail + "?subject=" + this.contactSupportInfo.subject +
        "&body=" + this.contactSupportInfo.body;
      window.location.href = this.emailData;
    }
    else {
    if (this.workspaceurl) {
      this.isloading = true;
      if (AuthConfig.userInfo) {
        AuthConfig.userInfo.name = AuthConfig.Name;
        AuthConfig.userInfo.emailId = AuthConfig.email;
        AuthConfig.userInfo.isNewUser = AuthConfig.status === 'NEWUSER' ? true : false;
      }
      let postdata =
      {
        "userUid": AuthConfig.userInfo.userUid,
        "name": AuthConfig.userInfo.name,
        "emailId": AuthConfig.userInfo.emailId,
        "firstName": AuthConfig.userInfo.firstName,
        "roleName": AuthConfig.userInfo.roleName,
        "roleUid": AuthConfig.userInfo.roleUid,
        "status": AuthConfig.userInfo.status,
        "createdOn": AuthConfig.userInfo.createdOn,
        "modifiedOn": AuthConfig.userInfo.modifiedOn,
        "downtimeMessage": AuthConfig.userInfo.downtimeMessage,
        "isNewUser": AuthConfig.userInfo.isNewUser,
        "isExternalUser": AuthConfig.userInfo.isExternalUser
      }
      this.usecaseservice.getWorkspaceRequest(true,postdata).subscribe(
        (data) => {
          if (
            ALLOWED_STATUS_CODE.find((element) => element == data.statusCode)
          ) {
            if(data.responseData && (AuthConfig.template == 'ISTEMPLATEPPUBLISHED' || AuthConfig.template == 'HASDEFAULTWORKSPACEACCESS')){
              let url = '/' + AuthConfig.workspaceUrl + '/' + AuthConfig.usecaseURL
              this.router.navigate([url]);
            }
            else{
            this.workspaceurl = '';
            this.isAccessRequested = true;
            this.isloading = false;
            }
          }
        },
        (err) => {
          this.isloading = false;
        }
      );
    }
  }
}

  checkAccess() {
    this.isloading = true
    if (AuthConfig.workspaceUrl) {
      this.usecaseservice.getWorkspaceRequest().subscribe((data) => {
        if (ALLOWED_STATUS_CODE.find(element => element == data.statusCode)) {
          if (data && data.responseData) {
            this.isAccessRequested = true
          }
          else {
            this.isAccessRequested = false
          }
        }
        this.isloading = false;
      }, (err) => {
        console.log(err);
        this.isloading = false
      })
    }
    else {
      this.isloading = false
    }
  }

  imageLoaded(imageURL: any) {
    try {
      this.isloading = true
      const img = new Image();
      img.src = imageURL;

      img.addEventListener('load', () => {
        this.isImgloaded = true
        this.isloading = false
      });
      img.addEventListener('error', () => {
        this.isImgloaded = true
        this.isloading = false
      })
    } catch
    {
      this.isImgloaded = true;
      this.isloading = false
    }
  }
  openMyIndustryX() {
    window.open(environment.myIndustryURL, '_blank');
  }

  ngAfterViewInit() {
    this.imageLoaded(this.iconURL);
  }

  goToTermsAndPrivacy(data: any) {
    if (data == 'termsofuse') {
      this.router.navigate(['/termsofuse'])
    }
    else if (data == 'privacystatement') {
      this.router.navigate(['/privacystatement'])
    }
  }


  
  openMail(){
    this.emailData = "mailto:" + this.contactSupportInfo.toEmail;
    window.location.href = this.emailData;
  }
}
