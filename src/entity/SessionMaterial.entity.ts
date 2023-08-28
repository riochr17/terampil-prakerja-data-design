import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MaterialQuiz } from './MaterialQuiz.entity';
import { MaterialAssignment } from './MaterialAssignment.entity';
import { MaterialOnlineClass } from './MaterialOnlineClass.entity';
import { MaterialOfflineClass } from './MaterialOfflineClass.entity';
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { TrainingSession } from './TrainingSession.entity';
import { SessionMaterialType } from './SessionMaterialType.enum';

@Entity('SessionMaterial')
export class SessionMaterial {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => MaterialQuiz, _ => _.session_material, {
    cascade: true
  })
  list_material_quiz_session_material!: MaterialQuiz[];

  @OneToMany(() => MaterialAssignment, _ => _.session_material, {
    cascade: true
  })
  list_material_assignment_session_material!: MaterialAssignment[];

  @OneToMany(() => MaterialOnlineClass, _ => _.session_material, {
    cascade: true
  })
  list_material_online_class_session_material!: MaterialOnlineClass[];

  @OneToMany(() => MaterialOfflineClass, _ => _.session_material, {
    cascade: true
  })
  list_material_offline_class_session_material!: MaterialOfflineClass[];

  @OneToMany(() => UserTrainingSchedule, _ => _.current_session_material, {
    cascade: true
  })
  list_user_training_schedule_current_session_material!: UserTrainingSchedule[];

  @OneToMany(() => UserTrainingSchedule, _ => _.next_session_material, {
    cascade: true
  })
  list_user_training_schedule_next_session_material!: UserTrainingSchedule[];

  @ManyToOne(() => TrainingSession, training_session => training_session.id)
  @JoinColumn({ name: 'training_session_id' })
  training_session!: TrainingSession;

  @Column({
    type: 'enum',
    enum: SessionMaterialType,
    array: false
  })
  type!: SessionMaterialType;

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

