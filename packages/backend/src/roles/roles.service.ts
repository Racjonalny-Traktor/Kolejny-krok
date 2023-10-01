import { Injectable, Logger } from '@nestjs/common';
import { Occupation } from 'src/models/occupation';
import mockDB from '../mockDB/mockDB.json';

const DB = mockDB as Readonly<Occupation[]>;

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
}
