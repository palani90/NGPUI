import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from './app.component';
import { ErrormodaldailogComponent } from '../shared/components/errormodaldailog/errormodaldailog.component';
import { AuthorizationComponent } from '../shared/components/authorization/authorization.component';

import { SharedModule } from '../shared/shared.module';
import { ExternalUserValidationAuthGuard } from '../shared/services/ExternalUserValidationAuthGuard';
import { HttpCommonInterceptor } from '../shared/interceptor/httpcommon.interceptor';
import {  MatDialogModule } from '@angular/material/dialog';

export let config;






@NgModule({
  declarations: [
    AppComponent,
    ErrormodaldailogComponent,
    AuthorizationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports: [SharedModule],
    providers: [ExternalUserValidationAuthGuard,
   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCommonInterceptor,
      multi: true
    }

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
