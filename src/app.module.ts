import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import mailConfig from './config/mail.config';

import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CountriesModule } from './modules/countries/countries.module';
import { FeaturesModule } from './modules/features/features.module';
import { MailModule } from './modules/mail/mail.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { StatesModule } from './modules/states/states.module';
import { UsersModule } from './modules/users/users.module';

import { ExistConstraint } from './common/decorators/is-exist.validator';
import { UniqueConstraint } from './common/decorators/is-unique.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production', '.env.development'],
      isGlobal: true,
      load: [appConfig, databaseConfig, mailConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<string>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.userpassword'),
          entities: ['./**/*.entity{ .ts,.js}'],
          synchronize: true,
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    AddressModule,
    AuthModule,
    CategoriesModule,
    CitiesModule,
    CompaniesModule,
    CountriesModule,
    FeaturesModule,
    MailModule,
    ProfilesModule,
    SectorsModule,
    StatesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [UniqueConstraint, ExistConstraint],
})
export class AppModule {}
