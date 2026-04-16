import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableDocument = Table & Document;

@Schema({ timestamps: true })
export class Table {
  @Prop()
  name: string;

  @Prop({ default: 'empty' })
  status: 'empty' | 'occupied' | 'paying';

  @Prop({ default: null })
  currentOrderId: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);
