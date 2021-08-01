import { NestEventModule } from 'nest-event';

import { typeormConfig } from '@infrastructure/configs/ormconfig';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRepository } from '@modules/user/database/user.repository';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([UserOrmEntity]),
    NestEventModule,
    UserModule,
  ],
  controllers: [],
  providers: [UserRepository],
})
export class AppModule {}
