import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/healthcheck')
  getHealthcheck(): string {
    return 'OK';
  }
}
