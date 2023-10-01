export interface Root {
  data: Daum[];
}

export interface Daum {
  institution: string;
  major: Major;
}

export interface Major {
  name: string;
  majorExternalCode: string;
  studyField: string;
  studyLevel: string;
  voivodeship: string;
  studyFrom: string;
  studyProfile: string;
  semesters: string;
  faculty: string;
  majorData: MajorData;
  links: Link[];
}

export interface MajorData {
  graduationYear: number;
  experience: string;
  graduatesNumber: number;
  totalSalary: number;
  salaryInRelation: number;
  timeOfLookingForJob: number;
  unemployedRisk: number;
  unemployedRiskInRelation: number;
}

export interface Link {
  linkType: string;
  link: string;
}
