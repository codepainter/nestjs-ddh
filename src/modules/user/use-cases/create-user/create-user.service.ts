import { ID } from '@core/value-objects/id.value-object';
import { ConflictException } from '@exceptions';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';

import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserCommand } from './create-user.command';

export class CreateUserService {
  constructor(
    // no direct dependency on a repository, instead depends on a port
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async createUser(command: CreateUserCommand): Promise<ID> {
    // user uniqueness guard
    if (await this.userRepo.exists(command.email.value)) {
      throw new ConflictException('User already exists');
    }

    const user = new UserEntity(command);

    user.someBusinessLogic();

    const created = await this.userRepo.save(user);

    return created.id;
  }
}
