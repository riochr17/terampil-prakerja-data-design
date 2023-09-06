import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TrainingRating } from './TrainingRating.entity';
import { TrainingSession } from './TrainingSession.entity';
import { TrainingLocation } from './TrainingLocation.entity';
import { Library } from './Library.entity';
import { TrainingCompetency } from './TrainingCompetency.entity';
import { Category } from './Category.entity';
import { Trainer } from './Trainer.entity';
import { TrainingType } from './TrainingType.enum';

@Entity('Training')
export class Training {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => TrainingRating, _ => _.training, {
    cascade: true
  })
  list_training_rating_training!: TrainingRating[];

  @OneToMany(() => TrainingSession, _ => _.training, {
    cascade: true
  })
  list_training_session_training!: TrainingSession[];

  @OneToMany(() => TrainingLocation, _ => _.training, {
    cascade: true
  })
  list_training_location_training!: TrainingLocation[];

  @OneToMany(() => Library, _ => _.training, {
    cascade: true
  })
  list_library_training!: Library[];

  @OneToMany(() => TrainingCompetency, _ => _.training, {
    cascade: true
  })
  list_training_competency_training!: TrainingCompetency[];

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToOne(() => Trainer, trainer => trainer.id)
  @JoinColumn({ name: 'trainer_id' })
  trainer!: Trainer;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  course_code!: string;

  @Column({
    type: 'enum',
    enum: TrainingType,
    array: false
  })
  type!: TrainingType;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: false,
    
  })
  title!: string;

  @Column({
    type: 'text',
    array: false,
    nullable: true,
    
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: false,
    nullable: true,
    
  })
  thumbnail?: string;

  @Column({
    type: 'int',
    array: false,
    nullable: true,
    
  })
  duration_seconds?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

