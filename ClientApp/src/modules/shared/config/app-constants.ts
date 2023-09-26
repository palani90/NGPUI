
import { environment } from '../../../environments/environment';
export const uafAppId = "?appId=2&cId=";
export const HEADER_IMAGE = "../assets/images/svgs/";
export const INDUSTRYX_LOGO = "../assets/images/logo/";

export const DEFAULT_FORM_LOGO = 'icon-house';

export const APP_CONSTANTS = {
  industryUID: 'industryUID',
  activity: 'activity',
  brownField: 'BrownField',
  isActivity: 'isActivity',
  implementationMode: 'implementationMode',
  selectedSolutionLayer: 'selectedSolutionLayer',
  selectedModule: "",
  solutionTypeAccenture: "Accenture",
  solutionTypePackaged: "Packaged"
};

export const CLIENT_URL = "1bea369b-b0fb-4a25-958a-985b6c5f1207";

export const App_Name = "UseCase View";
export const CONTACT_SUPPORT = {
  toEmail: environment.toEmail,
  subject: "IEMP - Application Request access" + environment.emailMode,
  body: "Hi,%0D%0ARequest you to provide access to login to myIndustry X application.%0D%0A%0D%0ABusiness Case: (Type in the problem/query below)"
};

export const CONTACT_SUPPORTEMAIL= {
  toEmail:environment.toEmail,
  subject:"Support for IEMP related queries"
};
export const CONTACT_SUPPORT_INACTIVEUSER= {
  toEmail:environment.toEmail,
  subject:"IEMP - Request Access",
  body: "Hi,%0D%0ARequest you to provide access to login to IEM Platform.%0D%0A%0D%0ABusiness Case: (Type in the problem/query below)"
};

export const APPLICATION_NAME="usecase";

export const ALLOWED_STATUS_CODE = [200,400];

export const LOGOUT_DESCRIPTION = 'You will be logged off from the Application. To log back in, use the respective Workspace URL.';

//Grouping URL's to avoid CAST scan
export const USECASEVIEW_URL = {
  GET_MOCK_DATA:'https://localhost:44375' + '/api/Industry/GetAllIndustries',
  REQUEST_URL : 'https://graph.microsoft.com/beta/me/photo/$value',
  GRAPH_API_URL : 'https://graph.microsoft.com/v1.0/me/photos/48x48/$value'
}

export const USERINFO_RESPONSES = {
  WORKSPACENOTFOUND : 'WORKSPACENOTFOUND',
  INVURL: 'INVURL',
  ACCESSDENIED : 'ACCESSDENIED',
  NEW_USER:'NEWUSER'
}

export const ADD_FAVOURITE_MESSAGE = 'Added to your Favourites list';

export const REMOVE_FAVOURITE_MESSAGE = 'Removed from your Favourites list';

export const GET_HELP = 'https://in.accenture.com/industryx/new-upcoming/iemp-ambassador-hall-of-fame/';
export const FEEDBACKURL = 'https://ambassadors.ideas.aha.io/ideas/new';
export const GETHELP_CONTACT_SUPPORT = {
  toEmail: environment.toEmail,
  subject: 'IEMP Feedback'
}


export const myDAssessmentKey = 'atk';


export const VALIDATORS={
  globalSearch: '[^-&/,:()a-zA-Z0-9 ]',
  commentField:'[^a-zA-Z0-9 ^&,.():\/-]'
};

export const CONTACT_SUPPORT_MAIL = {
  toEmail: environment.toEmail,
  subject: 'IEMP - Request access' + environment.emailMode,
  body:
    'Hi,%0D%0ARequest you to provide access to login to' +
    ' IEM Platform.%0D%0A%0D%0ABusiness Case: (Type in the problem/query below)',
};

export const PROD_ENV = 'subprod';