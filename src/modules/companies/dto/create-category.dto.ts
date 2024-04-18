import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Exist } from '../../../common/decorators/is-exist.decorator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { Address } from '../../address/entities/address.entity';
import { Sector } from '../../sectors/entities/sector.entity';
import { Company } from '../entities/company.entity';

export class CreateCompanyDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 150)
  @Unique(Company, 'name')
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @Length(0, 300)
  @IsOptional()
  linkedin_link?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @Length(0, 300)
  @IsOptional()
  homepage_link?: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 50)
  @Unique(Company, 'tax_id')
  tax_id: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Exist(Sector, 'id')
  sector_id: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Exist(Address, 'id')
  address_id: number;
}
