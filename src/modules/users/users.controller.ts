import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './usser.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.loginUser(createUserDto);
  }
}
