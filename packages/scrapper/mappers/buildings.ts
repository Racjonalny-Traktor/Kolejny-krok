import { BuildingWithOccupations, Role, Root } from "../types/building";
import { Occupation } from "../types/places";

const mapRolesToOccupations = (role: Role): Pick<Occupation, 'id' | 'name'> => ({
    id: role.id,
    name: role.name,
});


export const mapBuildingToKnownFormat = (buildingData: Root): BuildingWithOccupations => ({
    id: buildingData.pageProps.building.id,
    name: buildingData.pageProps.building.name,
    occupations: buildingData.pageProps.building.occupations.map(mapRolesToOccupations),
});