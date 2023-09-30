import { Place } from "../types/places";

export const isBuilding = (place: Place): boolean => place.type === 'building';
export const isOccupation = (place: Place): boolean => place.type === 'occupation';
