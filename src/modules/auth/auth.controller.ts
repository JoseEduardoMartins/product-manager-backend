import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from '../users/user.service';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Listagem de usuarios utilizando filtros.',
    tags: ['Auth'],
  })
  @Post('login')
  login() {
    return '';
  }

  @ApiOperation({
    description: 'Listagem de usuarios utilizando filtros.',
    tags: ['Auth'],
  })
  @Post('register')
  register() {
    return '';
  }
}
