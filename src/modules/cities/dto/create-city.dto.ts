import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';
import { Exist } from 'src/common/decorators/is-exist.decorator';
import { State } from 'src/modules/states/entities/state.entity';

export class CreateCityDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 300)
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Exist(State, 'id')
  state_id: number;
}
