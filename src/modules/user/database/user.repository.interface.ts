import { RepositoryPort } from '@core/ports/repository.ports';

import { UserEntity, UserProps } from '../domain/entities/user.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface UserRepositoryPort
  extends RepositoryPort<UserEntity, UserProps> {
  findOneByEmailOrUndefined(email: string): Promise<UserEntity | undefined>;
  exists(email: string): Promise<boolean>;
}
