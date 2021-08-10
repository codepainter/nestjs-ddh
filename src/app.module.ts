
import {mongoAtlasOptions, mongoAtlasUri} from '@infrastructure/configs/mongo-atlas.config';
import {USER_MONGOOSE_ENTITY, UserMongooseEntity} from '@modules/user/database/user.mongoose-entity';
import {UserMongooseRepository} from '@modules/user/database/user.mongoose-repository';
import {UserModule} from '@modules/user/user.module';
import {Module} from '@nestjs/common';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(mongoAtlasUri, mongoAtlasOptions),
    MongooseModule.forFeature([
      {
        name: USER_MONGOOSE_ENTITY,
        schema: SchemaFactory.createForClass(UserMongooseEntity),
      },
    ]),
    EventEmitterModule.forRoot(),
    UserModule,
  ],
  controllers: [],
  providers: [UserMongooseRepository],
})
export class AppModule {}
