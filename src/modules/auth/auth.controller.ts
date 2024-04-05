import {
  Controller,
  Req,
  Res,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../users/users.service';
import { AddressService } from '../address/address.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { domainFormatter } from '../../common/helpers/domain-formater';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
    private usersService: UsersService,
    private addressService: AddressService,
  ) {}

  @ApiOperation({
    description: 'Autenticar de usuario.',
    tags: ['Auth'],
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<any> {
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

    if (user.is_deleted)
      throw new UnauthorizedException('User is deleted, check your email');

    delete user.created_at;
    delete user.updated_at;
    delete user.deleted_at;

    const token = await this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const domain = domainFormatter(request.get('origin'));

    response.cookie('token', token, {
      httpOnly: true,
      secure: domain !== 'localhost',
      domain,
    });

    return { user, token };
  }

  @ApiOperation({
    description: 'Registrar usuario.',
    tags: ['Auth'],
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const { address, ...user } = registerAuthDto;

    const responseAddress = await this.addressService.create(address);

    const response = await this.usersService.create({
      ...user,
      address_id: responseAddress.id,
    });

    this.mailerService.sendMail({
      to: user.email,
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      html: '<b>welcome</b>',
    });

    return response;
  }
}
