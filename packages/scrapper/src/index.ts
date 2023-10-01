import 'dotenv/config';
import { writeFile } from './helpers/writeFile';
import { processOccupations } from './scraping/occupations';

const PATH = `./DATA/formatted`;

processOccupations()
  .then((occupations) => {
    console.log('Scraping finished.');

    console.log({ occupations });

    writeFile(`${PATH}/new_occupations_${Date.now()}.json`, JSON.stringify(occupations, null, 2));
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
