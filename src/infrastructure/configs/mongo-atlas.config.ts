import { config } from 'dotenv';

import { MongooseModuleOptions } from '@nestjs/mongoose';

config();

export const mongoAtlasUri: string =
  process.env.MONGO_DB_URL || 'localhost:27017';
export const mongoAtlasOptions: MongooseModuleOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
};
