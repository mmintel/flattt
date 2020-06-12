import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  app(): string {
    return 'Here will be my amazing react frontend';
  }
}
