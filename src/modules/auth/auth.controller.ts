import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { generateRandomText } from 'src/common/helpers/string';
import { domainFormatter } from '../../common/helpers/domain-formater';
import { AddressService } from '../address/address.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { ConfirmAuthDto } from './dto/confirm-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
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

    if (!user) throw new UnauthorizedException(['Invalid email or password']);

    if (user?.password !== password)
      throw new UnauthorizedException(['Invalid email or password']);

    if (!user.is_active)
      throw new UnauthorizedException(['User is not active, check your email']);

    if (!user.is_verified)
      throw new UnauthorizedException([
        'User is not verified, check your email',
      ]);

    if (user.is_deleted)
      throw new UnauthorizedException(['User is deleted, check your email']);

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

    delete user.password;
    delete user.security_code;
    delete user.is_active;
    delete user.is_verified;
    delete user.is_deleted;
    delete user.created_at;
    delete user.updated_at;
    delete user.deleted_at;

    return {
      token,
      user,
    };
  }

  @ApiOperation({
    description: 'Registrar usuario.',
    tags: ['Auth'],
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const { address, ...user } = registerAuthDto;

    const responseAddress = !!address
      ? await this.addressService.create(address)
      : { id: undefined };

    const security_code = generateRandomText(6, '123456789');

    const response = await this.usersService.create({
      ...user,
      security_code,
      address_id: responseAddress.id,
    });

    this.mailService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome',
      context: {
        name: user.name,
        security_code,
      },
    });

    return response;
  }

  @ApiOperation({
    description: 'Confirmar email de usuario.',
    tags: ['Auth'],
  })
  @Post('confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirm(@Body() confirmAuthDto: ConfirmAuthDto) {
    const { email, security_code } = confirmAuthDto;

    const [user] = await this.usersService.find({
      select: ['id', 'security_code'],
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid email');

    if (user?.security_code !== security_code)
      throw new UnauthorizedException('Invalid code');

    await this.usersService.update(user.id, { is_verified: true });
  }
}
