import {Prop, Schema} from '@nestjs/mongoose';

@Schema()
export abstract class MongooseEntityBase {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @Prop()
  id!: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

  @Prop()
  deletedAt?: Date;
}
