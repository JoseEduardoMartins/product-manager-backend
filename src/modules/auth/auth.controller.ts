import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    description: 'Autenticação de usuario.',
    tags: ['Auth'],
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginAuthDto: LoginAuthDto): Promise<any> {
    const { email, password } = loginAuthDto;

    const [user] = await this.usersService.find({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid email or password');

    if (user?.password !== password)
      throw new UnauthorizedException('Invalid email or password');

    if (!user.is_active)
      throw new UnauthorizedException('User is not active, check your email');

    if (!user.is_verified)
      throw new UnauthorizedException('User is not verified, check your email');

    if (!user.is_deleted)
      throw new UnauthorizedException('User is not active, check your email');

    delete user.created_at;
    delete user.updated_at;
    delete user.deleted_at;

    return user;
  }
}
