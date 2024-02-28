import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsISO8601,
  IsBoolean,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { formatDate } from 'src/common/helpers/date';
import { encrypt } from 'src/common/helpers/crypto';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsISO8601()
  @Transform(({ value }) => formatDate(value))
  @IsOptional()
  birthdate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tax_id?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Transform(({ value }) => encrypt(value))
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  security_code?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_verified?: boolean;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  address_id?: number;
}
