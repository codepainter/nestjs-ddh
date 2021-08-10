import {config} from 'dotenv';
import {MongooseModuleOptions} from '@nestjs/mongoose';

config(); // Initializing dotenv

export const mongoAtlasUri: string = process.env.MONGO_DB_URL;
export const mongoAtlasOptions: MongooseModuleOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
};