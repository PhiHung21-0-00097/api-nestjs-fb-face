import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './dto/menu.schema';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu.name) private model: Model<Menu>) {}

  findAll() {
    return this.model.find();
  }

  create(data: any) {
    return this.model.create(data);
  }

  // 🔥 seed data
  async seedMenu() {
    const count = await this.model.countDocuments();
    if (count > 0) return;

    await this.model.insertMany([
      { name: 'Coca', price: 15000, type: 'drink' },
      { name: 'Pepsi', price: 15000, type: 'drink' },
      { name: 'Sting', price: 12000, type: 'drink' },
      { name: 'Trà đào', price: 20000, type: 'drink' },

      { name: 'Mì cay', price: 45000, type: 'food' },
      { name: 'Bánh tráng trộn', price: 20000, type: 'food' },
      { name: 'Cơm chiên', price: 35000, type: 'food' },
      { name: 'Gà rán', price: 50000, type: 'food' },
    ]);

    console.log('✅ Seed menu xong');
  }
}
