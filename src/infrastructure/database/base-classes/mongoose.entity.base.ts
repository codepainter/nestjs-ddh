
import {Prop} from '@nestjs/mongoose';

export abstract class MongooseEntityBase {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @Prop({ alias: "id" })
  _id!: string;

  @Prop({ type: Date })
  createdAt!: Date;

  @Prop({ type: Date })
  updatedAt!: Date;

  @Prop({ type: Date })
  deletedAt: Date;
}
