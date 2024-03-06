import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsDate,
  IsBoolean,
  IsEmail,
  IsObject,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class FiltersUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsDate()
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
  @IsDate()
  @IsOptional()
  created_at?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  updated_at?: Date;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  deleted_at?: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  address_id?: number;
}

export class ParamsUserDto {
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  select?: object;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  filters?: FiltersUserDto;
}

export class FindUserDto extends FiltersUserDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  select?: Array<string>;
}
