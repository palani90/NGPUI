import { environment } from '../../../environments/environment';
export const API_VERSION = '/api/v';

export const GET_CLIENT_DETAILS_API = environment.transformBaseURL + API_VERSION + environment.APIVersion + '/Client/ClientByClientUrl';

export const GRAPH_API_URL = 'https://graph.microsoft.com/v1.0/me/photos/48x48/$value';

export const GET_USECASEVIEW_API = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/UseCaseDetails';

//export const GET_USECASEVIEW_API = window.location.origin + '/assets/mock-data/getUseCaseView.json';

export const GET_USECASEBYUSECASEURL = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/UseCaseByUseCaseUrl';

//export const GET_USECASEBYUSECASEURL = window.location.origin + '/assets/mock-data/getUseCaseView.json';

export const POST_CAPTURE_METRIC = environment.baseURL + API_VERSION + environment.APIVersion + '/Metric/CaptureMetric';

export const WORKSPACE_REQUEST_API = environment.transformBaseURL + API_VERSION + environment.APIVersion + '/Client/RequestWorkspaceAccess';

export const REQUEST_ACCESS_API = environment.transformBaseURL + API_VERSION + environment.APIVersion + '/Client/IsAccessRequested';

export const SAVE_FAVOURITES = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/SaveUseCaseUserDetails';

export const GRANT_NEW_ACCESS_API = environment.showcaseBaseURL + API_VERSION + environment.APIVersion + '/Users/GrantNewAccess';

export const MYFAVORITES_SOLUTIONS_API = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/FavouriteSolutions';

// export const GET_VALUE_TREE_DETAILS = window.location.origin + '/assets/mock-data/VTMResponse.json';

export const GET_VALUE_TREE_DETAILS = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/UseCaseValueTree';

export const GET_GLOBAL_SEARCH = environment.showcaseBaseURL + API_VERSION + environment.APIVersion + '/Workspace/GetSearchResults';
export const GET_POPULAR_RESULTS =
  environment.showcaseBaseURL + API_VERSION + environment.APIVersion + '/Workspace/GetRecentPopularResults';
export const SAVE_SEARCH = environment.showcaseBaseURL + API_VERSION + environment.APIVersion + '/Workspace/SaveSearchQuery';
export const CAPTURE_METRIC_API = environment.showcaseBaseURL + '/api/v' + environment.APIVersion + '/Metric/CaptureMetric';

export const BENCHMARK_DROPDOWN_VALUE = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/BenchmarkDropDownValues';
export const BENCHMARK_RESULTS = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/BenchmarkResults';
export const KPI_DETAILS = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/KpiDetails';
export const FEEDBACK_API = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/UserFeedback';
