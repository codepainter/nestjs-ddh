import {Module} from '@nestjs/common';
import {MongooseModule, SchemaFactory} from '@nestjs/mongoose';
import {UserMongooseEntity} from './database/user.mongoose-entity';
import {UserMongooseRepository} from './database/user.mongoose-repository';
import {CreateUserHttpController} from './use-cases/create-user/create-user.http.controller';
import {
  FindUserByEmailHttpController,
} from './use-cases/find-user-by-email/find-user-by-email.http.controller';
import {DeleteUserHttpController} from './use-cases/remove-user/delete-user.controller';
import {createUserProvider, removeUserProvider} from './user.providers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserMongooseEntity.name,
        schema: SchemaFactory.createForClass(UserMongooseEntity)
      }
    ])
  ],
  controllers: [
    CreateUserHttpController,
    DeleteUserHttpController,
    FindUserByEmailHttpController,
  ],
  providers: [UserMongooseRepository, createUserProvider, removeUserProvider],
})
export class UserModule {}
