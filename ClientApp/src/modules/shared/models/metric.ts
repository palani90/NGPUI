export class Metric {

    public metricType: string | null;
    public metricValue: string | null;
    public applicationName: string | null;
    public feature: string | null;
    public pageName: string | null;
    public description: string | null;
  
    constructor() {
      this.metricType = "EnablerMetric";
      this.metricValue = "";
      this.applicationName = "Tools";
      this.feature = "EnablerLaunch";
      this.pageName = "Home";
      this.description = "";
    }
  }
  