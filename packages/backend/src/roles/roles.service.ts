import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Occupation } from 'src/models/occupation';
import * as mockDB from '../mockDB/mockDB.json';
import * as elaFilters from '../mockDB/elaFilters.json';

const DB = mockDB as Readonly<Occupation[]>;
const ELA_FILTERS = elaFilters as Readonly<{ name: string; code: string }[]>;

const getSpecification = (education: string): string => {
  const specifications = education.split(';');

  const output = [];

  specifications.forEach((spec) => {
    if (spec.includes('Studia')) {
      output.push(spec.split('Studia')[1].trim());
    }

    if (spec.includes('(kierunek')) {
      const [, specificationWithBraces] = education.split('(kierunek');
      output.push(specificationWithBraces.split(')')[0]);
    }
  });

  return output.join(' ');
};

const tokenize = (array: string) =>
  array.split(' ').filter((token) => token.length >= 3);

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor() {}

  async get(occupationId: number): Promise<Occupation> {
    this.logger.debug(`Fetching the role from DB: ${occupationId}`);

    const index = DB.findIndex((occupation) => occupation.id === occupationId);

    if (index === -1) {
      throw new Error('No occupation with this Id in our database');
    }

    return DB[index];
  }

  async findUniversitiesWithSpecificEducation(education: string): Promise<any> {
    this.logger.debug(`Fetching the univerisites for education: ${education}`);

    const educationTokens = tokenize(getSpecification(education));

    let highestMatches = 0;
    let highestMatchingFilterCode: string | undefined;
    let highestMatchingFilterName: string | undefined;

    ELA_FILTERS.forEach((filter) => {
      let tokenMatchesCounter = 0;
      const filterNames = tokenize(filter.name);

      filterNames.forEach((element) => {
        if (educationTokens.includes(element)) {
          tokenMatchesCounter++;
        }
      });

      if (highestMatches < tokenMatchesCounter) {
        highestMatches = tokenMatchesCounter;
        highestMatchingFilterCode = filter.code;
        highestMatchingFilterName = filter.name;
      }
    });

    if (!highestMatchingFilterCode) {
      throw new NotFoundException();
    }

    this.logger.debug(
      `Found the filter for education: ${highestMatchingFilterCode}: ${highestMatchingFilterName}`,
    );
    return highestMatchingFilterCode;
  }
}
