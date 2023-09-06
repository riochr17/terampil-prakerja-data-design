import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Training } from './Training.entity';


@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => Training, _ => _.category, {
    cascade: true
  })
  list_training_category!: Training[];

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  label!: string;

  @Column({
    type: 'text',
    array: false,
    nullable: true,
    
  })
  description?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

