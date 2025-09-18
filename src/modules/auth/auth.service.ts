import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {} // ✅ inject JwtService

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
    // ✅ Kiểm tra user ở DB (ví dụ hardcode trước)
    if (username !== 'admin' || password !== '123123@') {
      throw new UnauthorizedException('Sai username hoặc password');
    }

    // ✅ Tạo JWT token
    const payload = { id: '123123', username };
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
