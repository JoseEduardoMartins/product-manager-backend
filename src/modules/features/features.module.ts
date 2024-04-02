import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { Feature } from './entities/feature.entity';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeaturesService],
  controllers: [FeaturesController],
  exports: [TypeOrmModule],
})
export class FeaturesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(FeaturesController);
  }
}
