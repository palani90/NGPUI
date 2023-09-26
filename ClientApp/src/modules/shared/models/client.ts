
export class clientModel {
  clientWorkspaceUid: string;
  userUId: string;
  createdByUser: null;
  workspaceUrl: string;
  clientLogo: string;
  clientColors: colorModel[];
  industryUId: string;
  industryName: string;
  marketUnitUId: string;
  marketUnitName: string;
  marketUId: string;
  marketName: string;
  clientWorkspaceName: string;
  workspaceCreator: string;
  permissionUId: string;
  permissionName: string;
  isCustomRole: boolean;
  lastEditedOn: string;
  members: null;
  externalWorkspaceId: number;
  modifiedOn: null;
  createdOn: null;
  nominateOwner: null;
  phoenixDcuid: string;
  valueRealizationUrl: string;
  applications: Applications[];
  clientUid: string;
  clientName: string;
  clientContactName: string;
  clientEmail: string;
  externalClientId: number;
  phoenixClientUid: string;
}

export class Applications {
  public applicationUid: string | null;
  public applicationName: string | null;
  public accessTypeUid: string | null;
  public accesstypeName: string | null;

  constructor(client: any = {}) {
    this.applicationUid = client.applicationUid || '';
    this.applicationName = client.applicationName || '';
    this.accessTypeUid = client.accessTypeUid || '';
    this.accesstypeName = client.accesstypeName || '';
  }
}

export class colorModel {
  colorOrder: number;
  color: string;
}
