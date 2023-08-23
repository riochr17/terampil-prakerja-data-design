import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrainingScheduleSession } from './TrainingScheduleSession.entity';
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { TrainingLocation } from './TrainingLocation.entity';


@Entity('TrainingSchedule')
export class TrainingSchedule {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => TrainingScheduleSession, _ => _.training_schedule, {
    cascade: true
  })
  list_training_schedule_session_training_schedule!: TrainingScheduleSession[];

  @OneToMany(() => UserTrainingSchedule, _ => _.training_schedule, {
    cascade: true
  })
  list_user_training_schedule_training_schedule!: UserTrainingSchedule[];

  @ManyToOne(() => TrainingLocation, training_location => training_location.id)
  @JoinColumn({ name: 'training_location_id' })
  training_location!: TrainingLocation;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  __title__hapus!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  description!: string;

  @Column({
    type: 'date',
    array: false
  })
  __start_date__hapus!: any;

  @Column({
    type: 'date',
    array: false
  })
  __end_date__hapus!: any;

  @Column({
    type: 'int',
    array: false
  })
  quota!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

