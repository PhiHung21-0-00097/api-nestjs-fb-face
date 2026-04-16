import { Module, OnModuleInit } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './dto/menu.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule implements OnModuleInit {
  constructor(private readonly service: MenuService) {}

  async onModuleInit() {
    await this.service.seedMenu();
  }
}
