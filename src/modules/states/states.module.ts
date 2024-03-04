import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { StateService } from './states.service';
import { StateController } from './states.controller';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateService],
  controllers: [StateController],
  exports: [TypeOrmModule],
})
export class StateModule {}
