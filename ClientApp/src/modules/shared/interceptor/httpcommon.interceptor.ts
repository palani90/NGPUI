import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialogConfig,  MatDialog } from '@angular/material/dialog';
import { ErrormodaldailogComponent } from '../components/errormodaldailog/errormodaldailog.component';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AuthConfig } from '../models/authconfig';
import { Router } from '@angular/router';
import { ALLOWED_STATUS_CODE, USERINFO_RESPONSES } from '../config/app-constants';
import { UseCaseViewService } from '../services/usecaseView.service';
@Injectable()
export class HttpCommonInterceptor implements HttpInterceptor {
  constructor(
    public matDialog: MatDialog,
    public router: Router,
    public useCaseViewService: UseCaseViewService,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modified: any = request.clone({ setHeaders: { 'Correlation-Id': Guid.raw(), 'workspace-Url': AuthConfig.workspaceUrl || '' } });
    return next.handle(modified).pipe(
      catchError((error: HttpErrorResponse) => {
        var errorAllowed: boolean = false;
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          if ([401].find((element) => element == error.status)) {
            if (
              error.error &&
              error.error.responseData &&
              error.error.responseData.toLowerCase() == USERINFO_RESPONSES.NEW_USER.toLowerCase() && 
              !AuthConfig.transformInstance
            ) {
              AuthConfig.userInfo = {
                name: 'name',
                emailId: 'username',
                createdOn: '',
                isAdmin: false,
                isExpand: false,
                modifiedOn: '',
                roleName: '',
                roleUid: '00000000-0000-0000-0000-000000000000',
                status: 'Active',
                userUid: '',
                isExternalUser: true,
                isNewUser: true,
                firstName:'',
                downtimeMessage:'',
              };
              this.useCaseViewService.GrantNewAccess().subscribe((data) => {
                if (ALLOWED_STATUS_CODE.find((element) => element == data.statusCode)) {
                  if (!AuthConfig.transformInstance) {
                    this.router.navigate(['/' + AuthConfig.usecaseURL]);
                  } else {
                    this.router.navigate(['/' + AuthConfig.workspaceUrl + '/' + AuthConfig.usecaseURL]);
                  }
                }
              });
            } else if (!errorMessage.includes('/graph')) {
              if(error?.url?.includes('/GetUserStatus')){
                AuthConfig.status = error?.error?.responseData;
                AuthConfig.template = error?.error?.template;
              }
              this.router.navigate(['/accessdenied']);
            }
          } else if ([400].find((_element) => _element == error.status) && !errorMessage.includes('/graph')) {
            errorAllowed = true;
          } else if (!errorMessage.includes('/graph')) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.data = {
              name: 'attention',
              message: error.error.message
            };
            const modalDialog = this.matDialog.open(ErrormodaldailogComponent, dialogConfig);
            modalDialog.afterClosed().subscribe((result) => {});
          }
        }
        if (errorAllowed) {
          return of(new HttpResponse({ body: error.error }));
        } else {
          return throwError(errorMessage);
        }
      })
    );
  }
}
