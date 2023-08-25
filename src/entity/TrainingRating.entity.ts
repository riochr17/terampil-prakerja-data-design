import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from './User.entity';
import { Training } from './Training.entity';


@Entity('TrainingRating')
export class TrainingRating {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Training, training => training.id)
  @JoinColumn({ name: 'training_id' })
  training!: Training;

  @Column({
    type: 'int',
    array: false
  })
  rating!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

