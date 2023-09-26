export class Client {
  public clientUid: string | null;
  public clientName: string | null;
  public opportunityUid: string | null;
  public oppourtunityName: string | null;
  public accessstatus: string | null;
  public permissionUid: string | null;
  public permissionName: string | null;
  public isSelected: boolean | null;

  constructor(users: any = {}) {
    this.clientUid = users.clientUid || null;
    this.clientName = users.clientName || [];
    this.opportunityUid = users.opportunityUid || null;
    this.oppourtunityName = users.oppourtunityName || null;
    this.accessstatus = users.accessstatus || 'Active';
    this.permissionUid = users.permissionUid || null;
    this.permissionName = users.permissionName || 'Read Only';
    this.isSelected = users.isSelected || false;
  }
}
