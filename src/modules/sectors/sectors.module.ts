import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { Sector } from './entities/sector.entity';
import { SectorsController } from './sectors.controller';
import { SectorsService } from './sectors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  providers: [SectorsService],
  controllers: [SectorsController],
  exports: [TypeOrmModule],
})
export class SectorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(SectorsController);
  }
}
