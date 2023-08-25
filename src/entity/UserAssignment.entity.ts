import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserTrainingSchedule } from './UserTrainingSchedule.entity';
import { MaterialAssignment } from './MaterialAssignment.entity';


@Entity('UserAssignment')
export class UserAssignment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => UserTrainingSchedule, user_training_schedule => user_training_schedule.id)
  @JoinColumn({ name: 'user_training_id' })
  user_training!: UserTrainingSchedule;

  @ManyToOne(() => MaterialAssignment, material_assignment => material_assignment.id)
  @JoinColumn({ name: 'material_assignment_id' })
  material_assignment!: MaterialAssignment;

  @Column({
    type: 'text',
    array: false,
    nullable: false
  })
  data!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

