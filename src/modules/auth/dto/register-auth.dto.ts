import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsISO8601,
  IsEmail,
  IsObject,
  IsOptional,
  Length,
} from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { formatDate } from '../../../common/helpers/date';
import { encrypt } from '../../../common/helpers/crypto';
import { User } from '../../users/entities/user.entity';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

export class RegisterAuthDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  name: string;

  @ApiProperty({ required: true })
  @IsISO8601()
  @Transform(({ value }) => formatDate(value))
  birthdate: Date;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 50)
  @Unique(User, 'phone')
  phone: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 50)
  @Unique(User, 'tax_id')
  tax_id: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @Length(0, 150)
  @Unique(User, 'email')
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => encrypt(value))
  @Length(8, 300)
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(0, 300)
  photo?: string;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  address?: CreateAddressDto;
}
