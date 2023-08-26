import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GroupQuiz } from './GroupQuiz.entity';
import { UserTrainingScheduleQuizSelected } from './UserTrainingScheduleQuizSelected.entity';
import { SessionMaterial } from './SessionMaterial.entity';
import { MaterialQuizType } from './MaterialQuizType.enum';

@Entity('MaterialQuiz')
export class MaterialQuiz {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => GroupQuiz, _ => _.material_quiz, {
    cascade: true
  })
  list_group_quiz_material_quiz!: GroupQuiz[];

  @OneToMany(() => UserTrainingScheduleQuizSelected, _ => _.material_quiz, {
    cascade: true
  })
  list_user_training_schedule_quiz_selected_material_quiz!: UserTrainingScheduleQuizSelected[];

  @ManyToOne(() => SessionMaterial, session_material => session_material.id)
  @JoinColumn({ name: 'session_material_id' })
  session_material!: SessionMaterial;

  @Column({
    type: 'enum',
    enum: MaterialQuizType,
    array: false
  })
  type!: MaterialQuizType;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

