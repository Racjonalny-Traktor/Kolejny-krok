import { isBuilding, isOccupation } from '../helpers/places';
import { Building, Occupation, Place } from '../types/places';

export const getAllBuildings = (list: Place[] | any): Building[] => {
  return list.filter(isBuilding) as Building[];
};

export const getAllOccupations = (list: Place[] | any): Occupation[] => {
  return list.filter(isOccupation) as Occupation[];
};

export const mapJSONPlaceToKnownFormat = (place: Place | Building | Occupation): Building | Occupation => ({
  id: place.id,
  name: place.name,
  future: place.future,
});
