import buildingsJSON from '../../DATA/formatted/buildings.json';

import { fetchHTML } from '../helpers/fetchHTML';
import { processApiCall, ScrapeFn } from '../helpers/processApiCalls';
import { getLinkToBuildingDetails } from '../links';
import { mapBuildingToKnownFormat } from '../mappers/buildings';
import { BuildingWithOccupations, Root as BuildingDTO } from '../types/building';
import { Building } from '../types/places';

const scrapeBuilding: ScrapeFn<Building, BuildingWithOccupations> = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    const URL = getLinkToBuildingDetails(id);
    console.log({ buildingId: id, URL });

    try {
      const html = (await fetchHTML(URL)) as unknown as BuildingDTO;
      return resolve(mapBuildingToKnownFormat(html));
    } catch (error) {
      console.error({ buildingId: id, error });
      return reject(error);
    }
  });
};

export async function processBuildings(): Promise<BuildingWithOccupations[]> {
  const buildings = [];

  for (let item of buildingsJSON) {
    const building = await processApiCall(item, scrapeBuilding);
    buildings.push(building);
  }

  return buildings;
}
