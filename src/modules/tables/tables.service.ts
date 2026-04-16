import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table } from './tables.schema';

@Injectable()
export class TablesService {
  constructor(@InjectModel(Table.name) private tableModel: Model<Table>) {}

  // lấy tất cả bàn
  findAll() {
    return this.tableModel.find();
  }

  // tạo bàn
  create(name: string) {
    return this.tableModel.create({ name });
  }

  // update trạng thái
  updateStatus(id: string, status: string) {
    return this.tableModel.findByIdAndUpdate(id, { status }, { new: true });
  }
  findById(id: string) {
    return this.tableModel.findById(id);
  }
}
