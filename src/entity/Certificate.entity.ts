import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';


@Entity('Certificate')
export class Certificate {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => UserTrainingSchedule, user_training_schedule => user_training_schedule.id)
  @JoinColumn({ name: 'user_training_id' })
  user_training!: UserTrainingSchedule;

  @Column({
    type: 'timestamp',
    array: false,
    nullable: false
  })
  issued_at!: Date;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false
  })
  serial_number!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

