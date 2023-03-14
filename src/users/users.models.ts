import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type My_Document = User & Document;
@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ nullable: true })
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
