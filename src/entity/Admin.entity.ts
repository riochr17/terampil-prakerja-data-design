import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('Admin')
export class Admin {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  fullname!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  profile_picture_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

