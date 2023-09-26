export interface ActiveColor {
  bg: string;
  text: string;
}
export interface ImpactData {
  sequence: number;
  level: string;
  value: string;
}
export interface SummaryData {
  id: string;
  group: string;
  text: string;
  active: boolean;
  isIndustryBenchmark?: boolean;
  indBenchTxt: string;
  iconIncrease: boolean;
  iconDecrease: boolean;
  kpiImprovement?: string;
  isSustain: boolean;
  activeColor: ActiveColor;
  impact: ImpactData;
  nextIds: string[];
  prevIds: string[];
}

export interface StepArea {
  width: number;
  height: number;
  mb: number;
}
