import * as mongoose from 'mongoose';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  mongoose.set('debug', process.env.NODE_ENV === 'local');

  await app.listen(3000);
}
bootstrap();
