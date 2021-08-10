import {Module} from '@nestjs/common';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';
import {USER_MONGOOSE_ENTITY, UserMongooseEntity} from './database/user.mongoose-entity';
import {UserMongooseRepository} from './database/user.mongoose-repository';
import {CreateUserHttpController} from './use-cases/create-user/create-user.http.controller';
import {
  FindUserByEmailHttpController,
} from './use-cases/find-user-by-email/find-user-by-email.http.controller';
import {DeleteUserHttpController} from './use-cases/remove-user/delete-user.http.controller';
import {createUserProvider, removeUserProvider} from './user.providers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MONGOOSE_ENTITY,
        schema: SchemaFactory.createForClass(UserMongooseEntity),
      },
    ]),
  ],
  controllers: [
    CreateUserHttpController,
    DeleteUserHttpController,
    FindUserByEmailHttpController,
  ],
  providers: [UserMongooseRepository, createUserProvider, removeUserProvider],
})
export class UserModule {}
