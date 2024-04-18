import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Length } from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { Exist } from '../../../common/decorators/is-exist.decorator';
import { Product } from '../entities/product.entity';
import { Category } from '../../categories/entities/category.entity';
import { Company } from '../../companies/entities/company.entity';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 150)
  @Unique(Product, 'name')
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 300)
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(0, 150)
  @IsOptional()
  brand?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @Exist(Category, 'id')
  category_id: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @Exist(Company, 'id')
  company_id: number;
}
