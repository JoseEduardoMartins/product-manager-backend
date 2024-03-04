import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class State {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 300,
  })
  name: string;

  @Column({
    name: 'short_name',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  short_name?: string;

  @Column({
    name: 'country_id',
    type: 'int',
  })
  country_id: number;
}
