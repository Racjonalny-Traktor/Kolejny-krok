import { Occupation } from '../places';

export interface Root {
  pageProps: PageProps;
  __N_SSG: boolean;
}

export interface PageProps {
  building: Building;
}

export interface Building {
  id: number;
  name: string;
  district_name: string;
  image: string;
  occupations: Role[];
}

export interface Role {
  avatar: string;
  name_voice_over: string;
  id: number;
  name: string;
  gender: string;
}

export type BuildingWithOccupations = {
  id: number;
  name: string;
  occupations: Pick<Occupation, 'id' | 'name'>[];
};
