import { mongoAtlasOptions, mongoAtlasUri } from '@infrastructure/configs/mongo-atlas.config';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(mongoAtlasUri, mongoAtlasOptions),
    EventEmitterModule.forRoot(),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
