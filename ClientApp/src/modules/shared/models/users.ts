
export class Users {
  public userUid: string;
  public name: string | null;
  public emailId: string | null;
  public roleName: string | null;
  public roleUid: string;
  public status: string | null;
  public createdOn: string | null;
  public modifiedOn: string | null;
  public isExpand: boolean;
  public isAdmin: boolean;
  public isExternalUser:boolean;
  public isNewUser?: boolean;
  public firstName : string;
  public downtimeMessage: string;

  constructor(users: any = {}) {
    this.userUid = users.userUid || '00000000-0000-0000-0000-000000000000';
    this.name = users.name || null;
    this.emailId = users.emailId || null;
    this.roleName = users.roleName || 'User';
    this.roleUid = users.roleUid || '00000000-0000-0000-0000-000000000000';
    this.status = users.status || null;
    this.createdOn = users.createdOn || null;
    this.modifiedOn = users.modifiedOn || null;
    this.isExpand = users.isExpand;
    this.isAdmin = users.isAdmin;
    this.isExternalUser=users.isExternalUser;
    this.isNewUser = users.isNewUser || false;
    this.firstName = users.firstName || '';
    this.downtimeMessage = users.downtimeMessage || '';
  }

}


