import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { MaterialOnlineClass } from './MaterialOnlineClass.entity';
import { UserOnlineCheckType } from './UserOnlineCheckType.enum';

@Entity('UserOnlineCheck')
export class UserOnlineCheck {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => UserTrainingSchedule, user_training_schedule => user_training_schedule.id)
  @JoinColumn({ name: 'user_training_id' })
  user_training!: UserTrainingSchedule;

  @ManyToOne(() => MaterialOnlineClass, material_online_class => material_online_class.id)
  @JoinColumn({ name: 'material_online_class_id' })
  material_online_class!: MaterialOnlineClass;

  @Column({
    type: 'enum',
    enum: UserOnlineCheckType,
    array: false
  })
  type!: UserOnlineCheckType;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

