import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Training } from './Training.entity';


@Entity('Trainer')
export class Trainer {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => Training, _ => _.trainer, {
    cascade: true
  })
  list_training_trainer!: Training[];

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: true,
    
  })
  profile_picture_url?: string;

  @Column({
    type: 'text',
    array: false,
    nullable: true,
    
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  occupation!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  signature_image_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

