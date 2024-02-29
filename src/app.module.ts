import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module';
import { UniqueConstraint } from './common/decorators/is-unique.validator';
import { EntityManager } from 'typeorm';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [UniqueConstraint, EntityManager],
})
export class AppModule {}
