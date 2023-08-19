import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { MaterialOfflineClass } from './MaterialOfflineClass.entity';
import { UserOfflineCheckType } from './UserOfflineCheckType.enum';

@Entity('UserOfflineCheck')
export class UserOfflineCheck {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => UserTrainingSchedule, user_training_schedule => user_training_schedule.id)
  @JoinColumn({ name: 'user_training_id' })
  user_training!: UserTrainingSchedule;

  @ManyToOne(() => MaterialOfflineClass, material_offline_class => material_offline_class.id)
  @JoinColumn({ name: 'material_offline_class_id' })
  material_offline_class!: MaterialOfflineClass;

  @Column({
    type: 'enum',
    enum: UserOfflineCheckType,
    array: false
  })
  type!: UserOfflineCheckType;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

