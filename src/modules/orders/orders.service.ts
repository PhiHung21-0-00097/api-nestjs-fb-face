import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TablesService } from '../tables/tables.service';
import { Order } from './dto/orders.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private tablesService: TablesService,
  ) {}

  // 🔥 tạo hoặc update order
  async createOrUpdate(data: any) {
    const { tableId, items } = data;

    const tableObjectId = new Types.ObjectId(tableId);

    let order = await this.orderModel.findOne({
      tableId: tableObjectId,
      status: 'open',
    });

    if (!order) {
      order = await this.orderModel.create({
        tableId: tableObjectId,
        items: [],
        total: 0,
      });

      await this.tablesService.updateStatus(tableId, 'occupied');
    }

    // 🔥 QUAN TRỌNG: replace toàn bộ items
    order.items = items;

    // 👉 tính lại total
    order.total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    await order.save();

    return order;
  }

  // 🔍 lấy order theo bàn
  getByTable(tableId: string) {
    return this.orderModel.findOne({
      tableId: new Types.ObjectId(tableId),
      status: 'open',
    });
  }

  // 💰 thanh toán
  async pay(tableId: string) {
    const tableObjectId = new Types.ObjectId(tableId);

    const order = await this.orderModel.findOne({
      tableId: tableObjectId,
      status: 'open',
    });

    console.log('order', order);

    if (!order) {
      throw new Error('Không tìm thấy order');
    }

    order.status = 'paid';
    await order.save();

    // reset bàn
    await this.tablesService.updateStatus(tableId, 'empty');

    return order;
  }
}
