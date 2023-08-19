import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';


@Entity('Invoice')
export class Invoice {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => UserTrainingSchedule, user_training_schedule => user_training_schedule.id)
  @JoinColumn({ name: 'user_training_id' })
  user_training!: UserTrainingSchedule;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  invoice_number!: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  redeem_code!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

