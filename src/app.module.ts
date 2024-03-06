import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from './modules/address/entities/address.entity';
import { AddressModule } from './modules/address/address.module';

import { City } from './modules/cities/entities/city.entity';
import { CitiesModule } from './modules/cities/cities.module';

import { Country } from './modules/countries/entities/country.entity';
import { CountriesModule } from './modules/countries/countries.module';

import { Sector } from './modules/sectors/entities/sector.entity';
import { SectorsModule } from './modules/sectors/sectors.module';

import { State } from './modules/states/entities/state.entity';
import { StatesModule } from './modules/states/states.module';

import { User } from './modules/users/user.entity';
import { UsersModule } from './modules/users/user.module';

import { UniqueConstraint } from './common/decorators/is-unique.validator';
import { ExistConstraint } from './common/decorators/is-exist.validator';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'product_manager',
      entities: [Address, City, Country, Sector, State, User],
      synchronize: true,
    }),
    AddressModule,
    CitiesModule,
    CountriesModule,
    SectorsModule,
    StatesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [UniqueConstraint, ExistConstraint],
})
export class AppModule {}
