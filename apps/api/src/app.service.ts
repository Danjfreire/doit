import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Postgres PASSWORD:', process.env.POSTGRES_PASSWORD);

    return 'Hello From NestJs!';
  }
}
