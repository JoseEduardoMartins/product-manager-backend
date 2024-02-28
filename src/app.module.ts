import { Module } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UniqueConstraint } from 'src/common/decorators/unique-field.decorator';
import { UsersModule } from './modules/users/user.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [EntityManager, UniqueConstraint],
})
export class AppModule {}
