import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SessionMaterial } from './SessionMaterial.entity';
import { Training } from './Training.entity';


@Entity('TrainingSession')
export class TrainingSession {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => SessionMaterial, _ => _.training_session, {
    cascade: true
  })
  list_session_material_training_session!: SessionMaterial[];

  @ManyToOne(() => Training, training => training.id)
  @JoinColumn({ name: 'training_id' })
  training!: Training;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  title!: string;

  @Column({
    type: 'int',
    array: false
  })
  order!: number;

  @Column({
    type: 'int',
    array: false
  })
  start_day!: number;

  @Column({
    type: 'int',
    array: false
  })
  duration_day!: number;

  @Column({
    type: 'text',
    array: false
  })
  description!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

