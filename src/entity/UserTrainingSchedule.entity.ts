import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserQuizQuestionAnswer } from './UserQuizQuestionAnswer.entity';
import { UserAssignment } from './UserAssignment.entity';
import { UserOnlineCheck } from './UserOnlineCheck.entity';
import { UserOfflineCheck } from './UserOfflineCheck.entity';
import { Certificate } from './Certificate.entity';
import { Invoice } from './Invoice.entity';
import { UserTrainingScheduleQuizSelected } from './UserTrainingScheduleQuizSelected.entity';
import { User } from './User.entity';
import { TrainingSchedule } from './TrainingSchedule.entity';
import { SessionMaterial } from './SessionMaterial.entity';
import { TrainingSession } from './TrainingSession.entity';


@Entity('UserTrainingSchedule')
export class UserTrainingSchedule {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => UserQuizQuestionAnswer, _ => _.user_training, {
    cascade: true
  })
  list_user_quiz_question_answer_user_training!: UserQuizQuestionAnswer[];

  @OneToMany(() => UserAssignment, _ => _.user_training, {
    cascade: true
  })
  list_user_assignment_user_training!: UserAssignment[];

  @OneToMany(() => UserOnlineCheck, _ => _.user_training, {
    cascade: true
  })
  list_user_online_check_user_training!: UserOnlineCheck[];

  @OneToMany(() => UserOfflineCheck, _ => _.user_training, {
    cascade: true
  })
  list_user_offline_check_user_training!: UserOfflineCheck[];

  @OneToMany(() => Certificate, _ => _.user_training, {
    cascade: true
  })
  list_certificate_user_training!: Certificate[];

  @OneToMany(() => Invoice, _ => _.user_training, {
    cascade: true
  })
  list_invoice_user_training!: Invoice[];

  @OneToMany(() => UserTrainingScheduleQuizSelected, _ => _.user_training_schedule, {
    cascade: true
  })
  list_user_training_schedule_quiz_selected_user_training_schedule!: UserTrainingScheduleQuizSelected[];

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => TrainingSchedule, training_schedule => training_schedule.id)
  @JoinColumn({ name: 'training_schedule_id' })
  training_schedule!: TrainingSchedule;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  redeem_voucher_code!: string;

  @Column({
    type: 'float',
    array: false,
    nullable: true,
    
  })
  progress?: number;

  @ManyToOne(() => SessionMaterial, session_material => session_material.id)
  @JoinColumn({ name: 'current_session_material_id' })
  current_session_material!: SessionMaterial;

  @ManyToOne(() => TrainingSession, training_session => training_session.id)
  @JoinColumn({ name: 'current_training_session_id' })
  current_training_session!: TrainingSession;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

