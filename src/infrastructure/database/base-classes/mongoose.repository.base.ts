import {FilterQuery, Model} from 'mongoose';
import {DomainEvents} from '@core/domain-events';
import {Logger} from '@core/ports/logger.port';
import {BaseEntityProps} from '../../../core/base-classes/entity.base';
import {NotFoundException} from '../../../core/exceptions';
import {
  DataWithPaginationMeta,
  FindManyPaginatedParams,
  QueryParams,
  RepositoryPort,
} from '../../../core/ports/repository.ports';
import {MongooseMapper} from './mongoose-mapper.base';

export type WhereCondition<MongooseEntity> = FilterQuery<MongooseEntity>;

export abstract class MongooseRepositoryBase<
  Entity extends BaseEntityProps,
  EntityProps,
  MongooseEntity,
> implements RepositoryPort<Entity, EntityProps>
{
  protected constructor(
    protected readonly repository: Model<MongooseEntity>,
    protected readonly mapper: MongooseMapper<Entity, MongooseEntity>,
    protected readonly logger: Logger,
  ) {}

  protected collection = this.repository.collection.name;

  protected abstract prepareQuery(
    params: QueryParams<EntityProps>,
  ): WhereCondition<MongooseEntity>;

  async save(entity: Entity): Promise<Entity> {
    const mongooseEntity = this.mapper.toMongooseEntity(entity);
    const result = await this.repository.create(mongooseEntity);
    this.logger.debug(
      `[Entity persisted]: ${this.collection} ${entity.id.value}`,
    );
    await DomainEvents.publishEvents(entity.id, this.logger);
    return this.mapper.toDomainEntity(result);
  }

  async saveMultiple(entities: Entity[]): Promise<Entity[]> {
    const ormEntities = entities.map((entity) =>
      this.mapper.toMongooseEntity(entity),
    );
    const result = await this.repository.insertMany(ormEntities);
    this.logger.debug(
      `[Multiple entities persisted]: ${entities.length} ${this.collection}`,
    );
    await Promise.all(
      entities.map((entity) =>
        DomainEvents.publishEvents(entity.id, this.logger),
      ),
    );
    return result.map((entity) => this.mapper.toDomainEntity(entity));
  }

  async findOne(
    params: QueryParams<EntityProps> = {},
  ): Promise<Entity | undefined> {
    const filter = this.prepareQuery(params);
    const found = await this.repository.findOne(filter);
    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findOneOrThrow(params: QueryParams<EntityProps> = {}): Promise<Entity> {
    const found = await this.findOne(params);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async findOneByIdOrThrow(id: string): Promise<Entity> {
    const found = await this.repository.findByIdAndRemove(id);
    if (!found) {
      throw new NotFoundException();
    }
    return this.mapper.toDomainEntity(found);
  }

  async findMany(params: QueryParams<EntityProps> = {}): Promise<Entity[]> {
    const result = await this.repository.find({
      where: this.prepareQuery(params),
    });

    return result.map((item) => this.mapper.toDomainEntity(item));
  }

  async findManyPaginated({
    params = {},
    pagination,
    orderBy,
  }: FindManyPaginatedParams<EntityProps>): Promise<
    DataWithPaginationMeta<Entity[]>
  > {
    const data = await this.repository
      .find(this.prepareQuery(params))
      .skip(pagination?.skip || 0)
      .limit(pagination?.limit || 5)
      .sort(orderBy);
    const count = data.length || 0;

    const result: DataWithPaginationMeta<Entity[]> = {
      data: data.map((item) => this.mapper.toDomainEntity(item)),
      count,
      limit: pagination?.limit,
      page: pagination?.page,
    };

    return result;
  }

  async delete(entity: Entity): Promise<Entity> {
    await this.repository.findOneAndRemove(
      this.mapper.toMongooseEntity(entity),
    );
    this.logger.debug(
      `[Entity deleted]: ${this.collection} ${entity.id.value}`,
    );
    await DomainEvents.publishEvents(entity.id, this.logger);
    return entity;
  }
}
