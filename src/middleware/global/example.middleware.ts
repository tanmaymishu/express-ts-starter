import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'before' })
export class ExampleMiddleware implements ExpressMiddlewareInterface {
  constructor() {
    // console.log('ExampleMiddleware loaded!');
  }

  use(request: any, response: any, next: (err?: any) => any): void {
    // console.log('ExampleMiddleware Called!');
    next(); // Call next() with no arguments (or err) to continue
  }
}
