import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrainingRating } from './TrainingRating.entity';
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { VoucherUser } from './VoucherUser.entity';
import { UserGender } from './UserGender.enum';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => TrainingRating, _ => _.user, {
    cascade: true
  })
  list_training_rating_user!: TrainingRating[];

  @OneToMany(() => UserTrainingSchedule, _ => _.user, {
    cascade: true
  })
  list_user_training_schedule_user!: UserTrainingSchedule[];

  @OneToMany(() => VoucherUser, _ => _.user, {
    cascade: true
  })
  list_voucher_user_user!: VoucherUser[];

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false
  })
  fullname!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: true
  })
  profile_picture_url?: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: true
  })
  phone_number?: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    array: false
  })
  gender!: UserGender;

  @Column({
    type: 'boolean',
    array: false,
    nullable: false
  })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

