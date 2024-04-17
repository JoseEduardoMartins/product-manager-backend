import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Unique } from '../../../common/decorators/is-unique.decorator';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 150)
  @Unique(Category, 'name')
  name: string;
}
