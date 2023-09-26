export class UseCaseViewModelResponse {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  isException: boolean;
  responseData: usecaseview;
}

export class usecaseview {
  overviewFeature: string[];
  challengeFeature: string[];
  useCaseUid: string;
  useCaseName: string;
  useCaseDescription: string;
  useCaseImageUrl: string;
  challengesDescription: string;
  caseStudies: CaseStudy[];
  maturityUid: string;
  maturityName: string;
  capabilityName: string;
  previewLink: string;
  demoLink: string;
  maturities: maturities[];
  useCaseIndustries: industrydetails[];
  useCaseSolutions: solutiondetails[];
  useCaseIntelligentAlgorithms: IntelligentAlgorithms[];
  isCustomUseCase: boolean;
  isFavorite: boolean;
  isPreviewLinkInternal: string;
  isDemoLinkInternal: string;
  labelName: string;
  constructor() {
    this.useCaseUid = this.useCaseUid || '00000000-0000-0000-0000-000000000000';
    this.useCaseName = this.useCaseName || '';
    this.useCaseDescription = this.useCaseDescription || '';
    this.challengesDescription = this.challengesDescription || '';
    this.caseStudies = this.caseStudies || [];
    this.useCaseImageUrl = this.useCaseImageUrl || '';
    this.maturityUid =
      this.maturityUid || '00000000-0000-0000-0000-000000000000';
    this.maturityName = this.maturityName || '';
    this.capabilityName = this.capabilityName || '';
    this.previewLink = this.previewLink || '';
    this.demoLink = this.demoLink || '';
    this.maturities = this.maturities || [];
    this.useCaseIndustries = this.useCaseIndustries || [];
    this.useCaseSolutions = this.useCaseSolutions || [];
    this.useCaseIntelligentAlgorithms = this.useCaseIntelligentAlgorithms || [];
    this.isCustomUseCase = this.isCustomUseCase || false;
    this.isFavorite = this.isFavorite || false;
    this.isPreviewLinkInternal = this.isPreviewLinkInternal || null;
    this.isDemoLinkInternal = this.isDemoLinkInternal || null;
    this.labelName = this.labelName || '';
    this.overviewFeature= this.overviewFeature || [];
    this.challengeFeature= this.challengeFeature || [];
  
  }
}

export interface maturities {
  maturityUid: string;
  maturityName: string;
  maturityDescription: string;
}
export interface CaseStudy {
  caseStudyDescription: string;
  caseStudyName: string;
  caseStudyParentUid: string;
  caseStudyURL: string;
  caseStudyClientLogo: string;
  displayOrder: number;
}

export class metricdetails {
  metricType: string;
  feature: string;
  pageName: string;
  metricValue: string;
}

export class industrydetails {
  industryUid: string;
  industryName: string;
}

export class solutiondetails {
  solutionUid: string;
  solutionName: string;
  solutionUrl: string;
  solutionTypeUid: string;
  solutionType: string;
  description: string;
  isSustain: string;
  createdOn: string;
  isMostUsedSolution: boolean;
  isMostPopular: boolean;
  isSolutionNew: boolean;
}
export class IntelligentAlgorithms {
  intelligentAlgorithmUId: string;
  intelligentAlgorithmUrl: string;
  intelligentAlgorithmName: string;
  intelligentAlgorithmDescription: string;
}
