import {Model} from 'mongoose';
import {UserEntity, UserProps} from 'src/modules/user/domain/entities/user.entity';
import {QueryParams} from '@core/ports/repository.ports';
import {NotFoundException} from '@exceptions';
import {
  MongooseRepositoryBase,
  WhereCondition,
} from '@infrastructure/database/base-classes/mongoose.repository.base';
import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {USER_MONGOOSE_ENTITY, UserMongooseEntity} from './user.mongoose-entity';
import {UserMongooseMapper} from './user.mongoose-mapper';
import {UserRepositoryPort} from './user.repository.interface';

@Injectable()
export class UserMongooseRepository
  extends MongooseRepositoryBase<UserEntity, UserProps, UserMongooseEntity>
  implements UserRepositoryPort
{
  constructor(
    @InjectModel(USER_MONGOOSE_ENTITY)
    private readonly userRepository: Model<UserMongooseEntity>,
  ) {
    super(
      userRepository,
      new UserMongooseMapper(UserEntity, UserMongooseEntity),
      new Logger('user.mongoose-repository'),
    );
  }

  private async findOneByEmail(
    email: string,
  ): Promise<UserMongooseEntity | null> {
    const user = await this.userRepository
      .findOne({
        email,
      })
      .exec();

    return user;
  }

  async findOneByEmailOrThrow(email: string): Promise<UserEntity> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(user);
  }

  async exists(email: string): Promise<boolean> {
    const found = await this.findOneByEmail(email);
    if (found) {
      return true;
    }
    return false;
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<UserProps>,
  ): WhereCondition<UserMongooseEntity> {
    const filter: QueryParams<UserMongooseEntity> = {};
    if (params.id) {
      filter.id = params.id.value;
    }
    return filter as WhereCondition<UserMongooseEntity>;
  }
}
