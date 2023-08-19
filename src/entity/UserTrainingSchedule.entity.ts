import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserQuizQuestionAnswer } from './UserQuizQuestionAnswer.entity';
import { UserAssignment } from './UserAssignment.entity';
import { UserOnlineCheck } from './UserOnlineCheck.entity';
import { UserOfflineCheck } from './UserOfflineCheck.entity';
import { Certificate } from './Certificate.entity';
import { Invoice } from './Invoice.entity';
import { User } from './User.entity';
import { TrainingSchedule } from './TrainingSchedule.entity';


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

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => TrainingSchedule, training_schedule => training_schedule.id)
  @JoinColumn({ name: 'training_schedule_id' })
  training_schedule!: TrainingSchedule;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

