import { ID } from '@core/value-objects/id.value-object';
import { UserRepositoryPort } from '@modules/user/database/user.repository.interface';

export class DeleteUserService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async delete(id: string): Promise<void> {
    const found = await this.userRepo.findOneByIdOrUndefined(new ID(id));
    if (found) await this.userRepo.delete(found);
  }
}
