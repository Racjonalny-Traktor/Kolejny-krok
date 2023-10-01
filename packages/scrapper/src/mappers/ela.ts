import elaFilters from '../../DATA/manually/elaFilters.json';
import { writeFile } from '../helpers/writeFile';

type ElaFilter = {
    code: number;
    name: string;
    availability: 'AVAILABLE' | 'NOTAVAILABLE';
};

const filters = elaFilters  as unknown as ElaFilter[];

const PATH = `./DATA/formatted`;


const onlyAvaiableFilters = filters.filter((filter) => filter.availability === 'AVAILABLE').map((filter) => ({ code: filter.code, name: filter.name }));

console.log({ onlyAvaiableFilters });

writeFile(`${PATH}/elaFilters_${Date.now()}.json`, JSON.stringify(onlyAvaiableFilters));