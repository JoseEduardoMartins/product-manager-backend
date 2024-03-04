import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  street: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(0, 300)
  complement?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  number?: number;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 50)
  zipcode: string;

  @ApiProperty({ required: false })
  @IsNumber()
  country_id: number;

  @ApiProperty({ required: false })
  @IsNumber()
  state_id: number;

  @ApiProperty({ required: false })
  @IsNumber()
  city_id: number;
}
