import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

import { AuthConfig } from "../models/authconfig";
import { Users } from '../models/users';

@Injectable()
export class ExternalUserValidationAuthGuard implements CanActivate {
  constructor() { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let account;
    let activeAccount = {username:''}
    if (activeAccount && activeAccount.username) {
      account = activeAccount;
      account.userName = account.username;
    } 

    AuthConfig.UserProfile = account.name;
    AuthConfig.userInfo = new Users();
    if (account && account.userName.toLowerCase().trim().substr(account.userName.toLowerCase().trim().length - 13).includes("accenture.com")) {
      AuthConfig.userInfo.isExternalUser = false;
    }
    else {
      AuthConfig.userInfo.isExternalUser = true;
    }
    return true;
  }
}
