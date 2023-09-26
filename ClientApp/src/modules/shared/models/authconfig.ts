import { clientModel } from "../models/client";
import { usecasedata } from "./usecase.model";
import { Users } from "./users";

export class AuthConfig {
  public static clientObj: clientModel;
  public static usecaseObj : usecasedata
  public static userInfo: Users;
  public static isFormOpendFromTakeaTour = false;
  public static UserProfile:string;
  public static usecaseId ='';
  public static usecaseURL ='';
  public static showcaseInstance = false;
  public static transformInstance = false;
  public static workspaceUrl = '';
  public static Name: string;
  public static Username: string;
  public static email: string;
  public static status: string;
  public static template : string;
}
