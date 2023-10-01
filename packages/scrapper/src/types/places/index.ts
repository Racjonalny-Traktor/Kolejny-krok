type PlaceType = 'occupation' | 'building';

export type Place<T = PlaceType> = {
  id: number;
  type: T;
  name: string;
  future: boolean;
};

export type Building = Omit<Place<'building'>, 'type'>;

export type Occupation = Omit<Place<'occupation'>, 'type'>;
