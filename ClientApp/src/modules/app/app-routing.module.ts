import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from '../shared/components/authorization/authorization.component';
import { PagenotfoundComponent } from '../shared/components/pagenotfound/pagenotfound.component';
import { TermsPrivacyComponent } from '../shared/components/terms-privacy/terms-privacy.component';
import { ExternalUserValidationAuthGuard } from '../shared/services/ExternalUserValidationAuthGuard';

export const routes: Routes = [
  {
    // route to accessdenied page when matched
    path: "accessdenied",
    canActivate: [ExternalUserValidationAuthGuard],
    component: AuthorizationComponent,
    pathMatch: 'full'
  },
  { path: 'accessrequest',  component:AuthorizationComponent  ,pathMatch: 'full' },
  { path: 'pagenotfound',  component: PagenotfoundComponent },
  {
    //route to terms of use page
    path: 'termsofuse',
    canActivate: [ExternalUserValidationAuthGuard],
    component: TermsPrivacyComponent,
    pathMatch:'full'
  },
  {
    //route to privacy statement
    path: 'privacystatement',
    canActivate: [ExternalUserValidationAuthGuard],
    component: TermsPrivacyComponent,
    pathMatch:'full'
  },
  {
    path: '',
    canActivate: [
      
    ],
    children: [
      {
        path: '',
        loadChildren: () => import('../ngpPayslip/ngpPayslip.module').then(m => m.UsecaseviewModule),
      }
    ]
  },
  { path: '**',  component: PagenotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
