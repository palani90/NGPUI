import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { SectionLoaderComponent } from './components/section-loader/section-loader.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StatusMessageComponent } from './components/status-message/status-message.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { TermsPrivacyComponent } from './components/terms-privacy/terms-privacy.component';
import { TermsOfUseComponent } from './components/terms-privacy/terms-of-use/terms-of-use.component';
import { PrivacyStatementComponent } from './components/terms-privacy/privacy-statement/privacy-statement.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { KeyPressValidatorDirective } from './directives/key-press-validator.directive';
import { ConfidentialityPopupComponent } from './components/confidentiality-popup/confidentiality-popup.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { FeedbackComponent } from './components/feedback/feedback.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    PageLoaderComponent,
    SectionLoaderComponent,
    StatusMessageComponent,
    ConfirmationPopupComponent,
    TermsPrivacyComponent,
    TermsOfUseComponent,
    PrivacyStatementComponent,
    PagenotfoundComponent,
    KeyPressValidatorDirective,
    ConfidentialityPopupComponent,
    CustomSelectComponent,
    OutsideClickDirective,
    FeedbackComponent
  ],
  imports: [CommonModule, RouterModule, MatSidenavModule, FormsModule, MatDialogModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PageLoaderComponent,
    StatusMessageComponent,
    ConfirmationPopupComponent,
    KeyPressValidatorDirective,
    CustomSelectComponent,
    OutsideClickDirective
  ]
})
export class SharedModule {}
