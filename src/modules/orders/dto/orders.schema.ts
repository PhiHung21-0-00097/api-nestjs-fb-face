import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'Table', required: true })
  tableId: Types.ObjectId;

  @Prop({
    type: [
      {
        menuItemId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    default: [],
  })
  items: {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
  }[];

  @Prop({ default: 0 })
  total: number;

  @Prop({ default: 'open' })
  status: 'open' | 'paid';
}

export const OrderSchema = SchemaFactory.createForClass(Order);
