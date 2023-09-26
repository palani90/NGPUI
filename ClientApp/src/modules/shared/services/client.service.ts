import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthConfig } from '../../shared/models/authconfig';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})

export class ClientService {
  constructor(private httpService: HttpService) { }
  getUserId() {
    return AuthConfig.userInfo.userUid;
  }
  getUserEmail() {
    return AuthConfig.userInfo.emailId.split('@')[0];
  }

  async getclientdataByName(clientName: string): Promise<any> {
    const apiURL = environment.baseURL + "/api/v" + environment.APIVersion + "/Clients/" + clientName;
    return await this.httpService.get(apiURL).toPromise();
  }
  
}
