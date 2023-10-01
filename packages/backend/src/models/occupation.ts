export interface Occupation {
  id: number;
  name: string;
  fullName: string;
  description: string;

  shortDescription: string;
  jobDescription: string;

  futureJob: boolean;
  employers: boolean;

  isRegulated: boolean;
  regulationDescription: string | null;

  skills: string | null;
  simillarOccupations: string | null;

  marketSize: string | null;
  salary: string | null;

  math: number;
  biology: number;
  physics: number;
  technics: number;
  polish: number;
  english: number;
  geography: number;
  history: number;
  wos: number;
  chemistry: number;
  informatics: number;
  art: number;
  music: number;

  education: string | null;
}
