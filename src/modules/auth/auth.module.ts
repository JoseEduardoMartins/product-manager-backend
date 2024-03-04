import { Module } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
