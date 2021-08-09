
import {MongooseEntityBase} from '@infrastructure/database/base-classes/mongoose.entity.base';
import {Prop, Schema} from '@nestjs/mongoose';

@Schema({ collection: "users" })
export class UserMongooseEntity extends MongooseEntityBase {
  constructor(props?: UserMongooseEntity) {
    super(props);
  }

  @Prop({ unique: true })
  email!: string;

  @Prop()
  country!: string;

  @Prop()
  postalCode!: string;

  @Prop()
  street!: string;
}
