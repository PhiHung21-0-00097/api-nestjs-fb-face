import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/usser.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = {
      id: '123123',
      username: 'admin',
      password: await bcrypt.hash('123123@', 10),
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login({ username, password }: { username: string; password: string }) {
    // 🔍 tìm user trong DB
    const user = await this.usersService.findByUsername(username);

    // ❌ không có user
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    // ❌ sai password
    if (user.password !== password) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    // ✅ tạo token
    const payload = { id: user._id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
