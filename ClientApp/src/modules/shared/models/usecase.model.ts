export class usecaseURLResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  isException: boolean;
  responseData: usecasedata;
}

export class usecasedata {
  useCaseUid: string;
  useCaseName: string;
}

export class BenchmarkResultsRes {
  isAgnostic:boolean;
  kg:boolean;
  benchmarkResults:BenchmarkResults[];
  constructor(data?:BenchmarkResultsRes) {
    this.isAgnostic = data?.isAgnostic ?? false;
    this.kg = data?.kg ?? false;
    this.benchmarkResults = Array.isArray(data?.benchmarkResults) ? data?.benchmarkResults.map(v => new BenchmarkResults(v)) : [];
  }
}

export class BenchmarkResults {
  kpiName: string | null;
  kpiFormula: string | null;
  industry: string | null;
  subIndustry: string | null;
  geography: string | null;
  country: string | null;
  revenueRange: string | null;
  system: string | null;
  benchmarkAverageValue: string | number | null;
  benchmarkUnit: string | null;
  benchmarkPercentile: string | number | null;
  sampleSize: string | number | null;
  measurementYear: string | number | null;
  constructor(data?: BenchmarkResults) {
    this.kpiName = data?.kpiName ? data?.kpiName : '-';
    this.kpiFormula = data?.kpiFormula ? data?.kpiFormula : '-';
    this.industry = data?.industry ? data?.industry : '-';
    this.subIndustry = data?.subIndustry ? data?.subIndustry : '-';
    this.geography = data?.geography ? data?.geography : '-';
    this.country = data?.country ? data?.country : '-';
    this.revenueRange = data?.revenueRange ? data?.revenueRange : '-';
    this.system = data?.system ? data?.system : '-';
    this.benchmarkAverageValue = data?.benchmarkAverageValue ? data?.benchmarkAverageValue : '-';
    this.benchmarkUnit = data?.benchmarkUnit ? data?.benchmarkUnit : '-';
    this.benchmarkPercentile = data?.benchmarkPercentile ? data?.benchmarkPercentile : '-';
    this.sampleSize = data?.sampleSize ? data?.sampleSize : '-';
    this.measurementYear = data?.measurementYear ? data?.measurementYear : '-';
  }
}

export class BenchmarkDropDownValues {
  industry: string[] | DropDownValue[] | null;
  subIndustry: string[] | DropDownValue[] | null;
  geography: string[] | DropDownValue[] | null;
  country: string[] | DropDownValue[] | null;
  revenueRange: string[] | DropDownValue[] | null;
  specificKPI: string[] | DropDownValue[] | null;
  year: number[] | string[] | DropDownValue[] | null;
  constructor(data?: BenchmarkDropDownValues) {
    this.industry = Array.isArray(data?.industry) ? data?.industry.map((v) => new DropDownValue(v)) : [];
    this.subIndustry = Array.isArray(data?.subIndustry) ? data?.subIndustry.map((v) => new DropDownValue(v)) : [];
    this.geography = Array.isArray(data?.geography) ? data?.geography.map((v) => new DropDownValue(v)) : [];
    this.country = Array.isArray(data?.country) ? data?.country.map((v) => new DropDownValue(v)) : [];
    this.revenueRange = Array.isArray(data?.revenueRange) ? data?.revenueRange.map((v) => new DropDownValue(v)) : [];
    this.specificKPI = Array.isArray(data?.specificKPI) ? data?.specificKPI.map((v) => new DropDownValue(v)) : [];
    this.year = Array.isArray(data?.year) ? data?.year.map((v) => new DropDownValue(v)) : [];
  }
}
export class DropDownValue {
  data: string | number;
  label: string | number;
  enableAllOption: boolean;
  constructor(data: string | number, isCUstomAll = false) {
    this.data = data;
    this.label = data;
    if (isCUstomAll) {
      this.enableAllOption = isCUstomAll;
    }
  }
}
export class KpiDetails {
  kpiName: string | null;
  description: string | null;
  kpiFormula: string | null;
  kpiType: string[] | null | string;
  kpiUnit: string | null;
  kpiTypeStr: string;
  constructor(data?: KpiDetails) {
    this.kpiName = data?.kpiName ? data?.kpiName : '-';
    this.description = data?.description ? data?.description : '-';
    this.kpiFormula = data?.kpiFormula ? data?.kpiFormula : '-';
    this.kpiUnit = data?.kpiUnit ? data?.kpiUnit : '-';
    if (Array.isArray(data?.kpiType)) {
      this.kpiType = data?.kpiType?.length ? data.kpiType : '-';
    } else {
      this.kpiType = '-';
    }
    if (Array.isArray(this.kpiType)) {
      const kpiTypes = [...this.kpiType];
      kpiTypes.shift();
      this.kpiTypeStr = kpiTypes.join(', ');
    }
  }
}

export interface BenchmarkResultsResponse {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  isException: boolean;
  responseData: BenchmarkResultsRes;
  correlationUId: string;
}
export interface BenchmarkDropDownValuesResponse {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  isException: boolean;
  responseData: BenchmarkDropDownValues;
  correlationUId: string;
}
export interface KpiDetailsResponse {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  isException: boolean;
  responseData: KpiDetails;
  correlationUId: string;
}

export class FeedbackDetails {
  FeedbackType: string;
  FeedbackDescription: string;
  constructor(data?:FeedbackDetails) {
    this.FeedbackType = data?.FeedbackType;
    this.FeedbackDescription = data?.FeedbackDescription;
  }
}

export interface FeedbackResponse{
  responseData:FeedbackDetails;
}
