import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
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
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  constructor(profile?: Partial<Profile>) {
    this.id = profile?.id;
    this.name = profile?.name;
    this.is_active = profile?.is_active;
  }
}
