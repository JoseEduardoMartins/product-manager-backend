import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Address } from '../address/entities/address.entity';
import { AddressService } from '../address/address.service';
import { MailService } from '../mail/mail.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Address]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AddressService, MailService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
