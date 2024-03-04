import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'street',
    type: 'varchar',
    length: 300,
  })
  street: string;

  @Column({
    name: 'complement',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  complement?: string;

  @Column({
    name: 'number',
    type: 'int',
    nullable: true,
  })
  number?: number;

  @Column({
    name: 'zipcode',
    type: 'varchar',
    length: 50,
  })
  zipcode: string;

  @Column({
    name: 'country_id',
    type: 'int',
  })
  country_id: number;

  @Column({
    name: 'state_id',
    type: 'int',
  })
  state_id: number;

  @Column({
    name: 'city_id',
    type: 'int',
  })
  city_id: number;
}
