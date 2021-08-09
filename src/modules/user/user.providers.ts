import {Provider} from '@nestjs/common';
import {UserMongooseRepository} from './database/user.mongoose-repository';
import {CreateUserService} from './use-cases/create-user/create-user.service';
import {DeleteUserService} from './use-cases/remove-user/delete-user.service';

/* Constructing providers to avoid having framework decorators
   in application core. */

export const createUserSymbol = Symbol('createUser');

export const createUserProvider: Provider = {
  provide: createUserSymbol,
  useFactory: (userRepo: UserMongooseRepository): CreateUserService => {
    return new CreateUserService(userRepo);
  },
  inject: [UserMongooseRepository],
};

export const removeUserSymbol = Symbol('removeUser');

export const removeUserProvider: Provider = {
  provide: removeUserSymbol,
  useFactory: (userRepo: UserMongooseRepository): DeleteUserService => {
    return new DeleteUserService(userRepo);
  },
  inject: [UserMongooseRepository],
};
