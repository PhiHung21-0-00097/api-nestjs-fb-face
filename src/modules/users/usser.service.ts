import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StatusResponse } from 'src/common/enums/StatusResponse.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async loginUser(createUserDto: CreateUserDto) {
    try {
      const newData = await this.userModel.create({ ...createUserDto });

      const user = await this.userModel.findById(newData._id);

      return {
        status: StatusResponse.SUCCESS,
        message: 'Đăng nhập thành công',
        data: user,
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException(
        {
          status: StatusResponse.FAIL,
          err,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
