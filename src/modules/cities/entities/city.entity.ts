import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'city' })
export class City {
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
    name: 'state_id',
    type: 'int',
  })
  state_id: number;

  constructor(city?: Partial<City>) {
    this.id = city?.id;
    this.name = city?.name;
    this.state_id = city?.state_id;
  }
}
