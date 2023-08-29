import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SessionMaterial } from './SessionMaterial.entity';
import { TrainingScheduleSession } from './TrainingScheduleSession.entity';
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { Training } from './Training.entity';


@Entity('TrainingSession')
export class TrainingSession {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => SessionMaterial, _ => _.training_session, {
    cascade: true
  })
  list_session_material_training_session!: SessionMaterial[];

  @OneToMany(() => TrainingScheduleSession, _ => _.training_session, {
    cascade: true
  })
  list_training_schedule_session_training_session!: TrainingScheduleSession[];

  @OneToMany(() => UserTrainingSchedule, _ => _.current_training_session, {
    cascade: true
  })
  list_user_training_schedule_current_training_session!: UserTrainingSchedule[];

  @ManyToOne(() => Training, training => training.id)
  @JoinColumn({ name: 'training_id' })
  training!: Training;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false
  })
  title!: string;

  @Column({
    type: 'int',
    array: false,
    nullable: false
  })
  order!: number;

  @Column({
    type: 'int',
    array: false,
    nullable: true
  })
  duration_seconds?: number;

  @Column({
    type: 'text',
    array: false,
    nullable: true
  })
  description?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

