import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'state' })
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

  constructor(state?: Partial<State>) {
    this.id = state?.id;
    this.name = state?.name;
    this.short_name = state?.short_name;
    this.country_id = state?.country_id;
  }
}
