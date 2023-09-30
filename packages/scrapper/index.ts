import 'dotenv/config';
import axios from 'axios';
// import cheerio from 'cheerio';
import fs from 'node:fs';
// import places from './DATA/places.json';
// import buildings from './DATA_FORMATTED/buildings.json';
import occupations from './DATA_FORMATTED/occupations.json';
// import places from './DATA/places.json';
// import { getAllBuildings, getAllOccupations, mapJSONPlaceToKnownFormat } from './mappers/listPlaces';
import { getLinkToBuildingDetails, getLinkToOccupation } from './links';
// import { setInterval } from 'node:timers/promises';
import { Building, Occupation as OccupationItem } from './types/places';
// import { mapBuildingToKnownFormat } from './mappers/buildings';
// import { BuildingWithOccupations, Root } from './types/building';
import { Occupation, Root } from './types/occupation';
import { mapOccupationToKnownFormat } from './mappers/occupations';



// const BASE_URL = 'https://mapakarier.org/_next/data/TFB5YHYlWb/miasto-zawodow/budynek/123/k.json?id=123&gender=k'
// const BASE_URL = String();

// const buildingsList: BuildingWithOccupations[] = [];
const occupationList: Occupation[] = [];


async function fetchHTML(url: string): Promise<string> {
    const { data } = await axios.get(url);
    return data;
}

// function processBuilding(item: Building): Promise<BuildingWithOccupations> {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const building = scrapeBuilding(item);
//             resolve(building);
//         }, 350);
//     });
// }


function processOccupation(item: OccupationItem): Promise<Occupation> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const occupation = scrapeOccupation(item);
            return resolve(occupation);
        }, 350);
    });
}

async function processOccupations() {
    for (let item of occupations) {
        const occupation = await processOccupation(item);
        occupationList.push(occupation);
    }

    // for (let item of occupations) {
        // const occupation = await processOccupation(occupations[0]);
        // occupationList.push(occupation);
    // }
}




// async function scrapeBuilding({ id }: Building): Promise<BuildingWithOccupations> {
//     return new Promise(async (resolve, reject) => {
//         const URL = getLinkToBuildingDetails(id);
//         console.log({ buildingId: id, URL });

//         try{
//             const html = await fetchHTML(URL) as unknown as Root;        
//             return resolve(mapBuildingToKnownFormat(html));    
//         } catch (error) {
//             console.error({ buildingId: id, error });
//             return reject(error);
//         }
//     });
// }






async function scrapeOccupation({ id }: OccupationItem): Promise<Occupation> {
    return new Promise(async (resolve, reject) => {
        const URL = getLinkToOccupation(id);
        console.log({ buildingId: id, URL });

        try{
            const html = await fetchHTML(URL) as unknown as Root;        
            return resolve(mapOccupationToKnownFormat(html));    
        } catch (error) {
            console.error({ buildingId: id, error });
            return reject(error);
        }
    });
}


// async function getAllBuildingsOccupations(): Promise<any> {
//     return new Promise(async (resolve, reject) => {
//         try {
//             for (let i = 0; i < buildings.length; i++) {
//                 await setTimeout(async () => scrapeBuilding(buildings[i]), 350);
//             }
            
//             // buildings.forEach(async (item) => setTimeout(async() => scrapeBuilding(item), 350));
//             // const building = await scrapeBuilding(buildings[0]);
//             // buildingsList.push(building);

//             return resolve(buildings);
//         } catch (error) {
//             console.error(error);
//             return reject(error);
//         }
//     });
// };


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

processOccupations()
    .then(() => {

        console.log("Scraping finished.");

        // console.log({ occupationList });

        fs.writeFile(`./DATA_FORMATTED/occupationsWithDetails${Date.now()}.json`, JSON.stringify(occupationList, null, 2), (err) => {        
            if (err) {
                return process.exit();
            }

            console.log('success');
        });

    })
    .catch(error => {
        console.error("An error occurred:", error);
    });


// const allBuildings = getAllBuildings(places).map(mapJSONPlaceToKnownFormat);
// const allOcupations = getAllOccupations(places).map(mapJSONPlaceToKnownFormat);

// const SAVE_FOLDER = './DATA_FORMATTED';

// fs.writeFile(`${SAVE_FOLDER}/buildings.json`, JSON.stringify(allBuildings, null, 2), (err) => {
    
//     if (err) {
//         return process.exit();
//     }

//     console.log('success');
// });



// fs.writeFile(`${SAVE_FOLDER}/occupations.json`, JSON.stringify(allOcupations, null, 2), (err) => {
    
//     if (err) {
//         return process.exit();
//     }

//     console.log('success');
// });