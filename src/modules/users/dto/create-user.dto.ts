import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsISO8601,
  IsEmail,
  IsOptional,
  Length,
} from 'class-validator';
import { formatDate } from 'src/common/helpers/date';
import { encrypt } from 'src/common/helpers/crypto';

export class CreateUserDto {
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
  phone: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 50)
  tax_id: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @Length(0, 150)
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
  @IsString()
  @IsOptional()
  @Length(6, 6)
  security_code?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  address_id?: number;
}
