import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Controller()
export class HomeController {
  @Get('/')
  home() {
    return { message: 'Home, Sweet Home.' };
  }
}