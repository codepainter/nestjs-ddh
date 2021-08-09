import {NestEventModule} from 'nest-event';
import {mongoAtlasOptions, mongoAtlasUri} from '@infrastructure/configs/mongo-atlas.config';
import {UserMongooseEntity} from '@modules/user/database/user.mongoose-entity';
import {UserMongooseRepository} from '@modules/user/database/user.mongoose-repository';
import {UserModule} from '@modules/user/user.module';
import {Module} from '@nestjs/common';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(mongoAtlasUri, mongoAtlasOptions),
    MongooseModule.forFeature([
      {
        name: UserMongooseEntity.name,
        schema: SchemaFactory.createForClass(UserMongooseEntity)
      }
    ]),
    NestEventModule,
    UserModule,
  ],
  controllers: [],
  providers: [UserMongooseRepository],
})
export class AppModule {}
