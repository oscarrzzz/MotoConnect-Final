import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('api')
  getStatus() {
    return { message: 'API funcionando correctamente' };
  }
}
