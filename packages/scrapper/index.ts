import 'dotenv/config';
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'node:fs';
import places from './DATA/places.json';
import { getAllBuildings, getAllOccupations, mapJSONPlaceToKnownFormat } from './mappers/listPlaces';


const BASE_URL = 'https://mapakarier.org/_next/data/TFB5YHYlWb/miasto-zawodow/budynek/123/k.json?id=123&gender=k'
// const BASE_URL = String(process.env.SITE_BASE_URL);

// async function fetchHTML(url: string): Promise<string> {
//     const { data } = await axios.get(url);
//     return data;
// }

// async function scrape(): Promise<void> {
//     const html = await fetchHTML(BASE_URL);

//     // const $ = cheerio.load(html);

//     console.log(html);

//     // console.log($.root()    );

//     // For demonstration, let's scrape all the headers from the website
//     // $('a').each((_idx, el) => {
//     //     const header = $(el).text();
//     //     console.log(header);
//     // });
// }

// scrape()
//     .then(() => {
//         console.log("Scraping finished.");
//     })
//     .catch(error => {
//         console.error("An error occurred:", error);
//     });


const allBuildings = getAllBuildings(places).map(mapJSONPlaceToKnownFormat);
const allOcupations = getAllOccupations(places).map(mapJSONPlaceToKnownFormat);

const SAVE_FOLDER = './DATA_FORMATTED';

fs.writeFile(`${SAVE_FOLDER}/buildings.json`, JSON.stringify(allBuildings, null, 2), (err) => {
    
    if (err) {
        return process.exit();
    }

    console.log('success');
});



fs.writeFile(`${SAVE_FOLDER}/occupations.json`, JSON.stringify(allOcupations, null, 2), (err) => {
    
    if (err) {
        return process.exit();
    }

    console.log('success');
});