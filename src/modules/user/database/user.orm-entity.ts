import { Column, Entity } from 'typeorm';

import { TypeormEntityBase } from '@infrastructure/database/base-classes/typeorm.entity.base';

@Entity('user')
export class UserOrmEntity extends TypeormEntityBase {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  email!: string;

  @Column()
  country!: string;

  @Column()
  postalCode!: string;

  @Column()
  street!: string;
}
