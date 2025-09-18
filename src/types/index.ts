export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
type StageTypes = "Prospecting" | "Negotiation" | "Closed Won" | "Closed Lost";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}

export interface Opportunity {
  id: string;
  name: string;
  stage: StageTypes;
  amount?: number;
  accountName: string;
}
