/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {BaseEntityProps} from '@core/base-classes/entity.base';
import {DateVO} from '@core/value-objects/date.value-object';
import {ID} from '@core/value-objects/id.value-object';
import {MongooseEntityBase} from './mongoose.entity.base';

export type MongooseEntityProps<MongooseEntity> = MongooseEntity;

export abstract class MongooseMapper<
  Entity extends BaseEntityProps,
  MongooseEntity,
> {
  constructor(
    private entityConstructor: new (...args: any[]) => Entity,
    private mongooseEntityConstructor: new (...args: any[]) => MongooseEntity,
  ) {}

  protected abstract toDomainProps(mongooseEntity: MongooseEntity): unknown;

  protected abstract toMongooseProps(
    entity: Entity,
  ): MongooseEntityProps<MongooseEntity>;

  toDomainEntity(mongooseEntity: MongooseEntity): Entity {
    const props = this.toDomainProps(mongooseEntity);
    return this.assignPropsToEntity(props, mongooseEntity);
  }

  toMongooseEntity(entity: Entity): MongooseEntity {
    const props = this.toMongooseProps(entity);
    return new this.mongooseEntityConstructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt.value,
    });
  }

  /** Tricking TypeScript to do mapping from OrmEntity to Entity's protected/private properties.
   * This is done to avoid public setters or accepting all props through constructor.
   * Public setters may corrupt Entity's state. Accepting every property through constructor may
   * conflict with some pre-defined business rules that are validated at object creation.
   * Never use this trick in domain layer. Normally private properties should never be assigned directly.
   */
  private assignPropsToEntity<Props>(
    entityProps: Props,
    mongooseEntity: MongooseEntity,
  ): Entity {
    const entityCopy: any = Object.create(this.entityConstructor.prototype);
    const mongooseEntityBase: MongooseEntityBase =
      mongooseEntity as unknown as MongooseEntityBase;

    entityCopy.props = entityProps;
    entityCopy._id = new ID(mongooseEntityBase.id);
    entityCopy._createdAt = new DateVO(mongooseEntityBase.createdAt);
    entityCopy._updatedAt = new DateVO(mongooseEntityBase.updatedAt);
    entityCopy._deletedAt = mongooseEntityBase.deletedAt
      ? new DateVO(mongooseEntityBase.deletedAt)
      : undefined;

    return entityCopy as unknown as Entity;
  }
}
