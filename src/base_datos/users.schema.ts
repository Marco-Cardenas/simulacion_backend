import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDoc = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({type:[String], default:[]})
  toBuy: string[];

  @Prop({type:[String], default:[]})
  bought: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);
