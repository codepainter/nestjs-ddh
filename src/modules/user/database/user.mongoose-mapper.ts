
import {
  MongooseEntityProps,
  MongooseMapper,
} from '@infrastructure/database/base-classes/mongoose-mapper.base';
import {UserEntity, UserProps} from '../domain/entities/user.entity';
import {Address} from '../domain/value-objects/address.value-object';
import {Email} from '../domain/value-objects/email.value-object';
import {UserMongooseEntity} from './user.mongoose-entity';

export class UserMongooseMapper extends MongooseMapper<UserEntity, UserMongooseEntity> {
  protected toMongooseProps(entity: UserEntity): MongooseEntityProps<UserMongooseEntity> {
    const props = entity.getPropsCopy();

    const mongooseProps: MongooseEntityProps<UserMongooseEntity> = {
      _id: props.id.value,
      email: props.email.value,
      country: props.address.country,
      postalCode: props.address.postalCode,
      street: props.address.street,
    };
    return mongooseProps;
  }

  protected toDomainProps(ormEntity: UserMongooseEntity): UserProps {
    const props: UserProps = {
      email: new Email(ormEntity.email),
      address: new Address({
        street: ormEntity.street,
        postalCode: ormEntity.postalCode,
        country: ormEntity.country,
      }),
    };
    return props;
  }
}
