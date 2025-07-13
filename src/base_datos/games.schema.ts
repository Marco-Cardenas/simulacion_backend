import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameDoc = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop()
  name: string;

  @Prop()
  desc: string;

  @Prop()
  tipo: string;

  @Prop()
  price: number;

  @Prop()
  tax: number;

}

export const GameSchema = SchemaFactory.createForClass(Game);
