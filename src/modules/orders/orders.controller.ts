import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.createOrUpdate(body);
  }

  @Get('table/:tableId')
  getByTable(@Param('tableId') tableId: string) {
    return this.service.getByTable(tableId);
  }

  @Patch(':tableId/pay')
  pay(@Param('tableId') tableId: string) {
    return this.service.pay(tableId);
  }
}
