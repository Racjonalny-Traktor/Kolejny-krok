import occupationsJSON from '../../DATA/formatted/occupations.json';

import { fetchHTML } from '../helpers/fetchHTML';
import { processApiCall, ScrapeFn } from '../helpers/processApiCalls';
import { getLinkToOccupation } from '../links';
import { mapOccupationToKnownFormat } from '../mappers/occupations';
import { OccupationCSVFriendly, Root as OccupationDTO } from '../types/occupation';

const scrapeOccupation: ScrapeFn<any, OccupationCSVFriendly> = async ({ id }) => {
  return new Promise(async (resolve, reject) => {
    const URL = getLinkToOccupation(id);
    console.log({ occupationId: id, URL });

    try {
      const html = (await fetchHTML(URL)) as unknown as OccupationDTO;
      return resolve(mapOccupationToKnownFormat(html));
    } catch (error) {
      console.error({ occupationId: id, error });
      return reject(error);
    }
  });
};

export async function processOccupations(): Promise<OccupationCSVFriendly[]> {
  const occupations = [];

  for (let item of occupationsJSON) {
      const occupation = await processApiCall(item, scrapeOccupation);
      occupations.push(occupation);
  }

//   const occupation = await processApiCall(occupationsJSON[10], scrapeOccupation);
//   occupations.push(occupation);

  return occupations;
}
