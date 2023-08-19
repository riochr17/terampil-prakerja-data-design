import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserOnlineCheck } from './UserOnlineCheck.entity';
import { SessionMaterial } from './SessionMaterial.entity';


@Entity('MaterialOnlineClass')
export class MaterialOnlineClass {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => UserOnlineCheck, _ => _.material_online_class, {
    cascade: true
  })
  list_user_online_check_material_online_class!: UserOnlineCheck[];

  @ManyToOne(() => SessionMaterial, session_material => session_material.id)
  @JoinColumn({ name: 'session_material_id' })
  session_material!: SessionMaterial;

  @Column({
    type: 'varchar',
    length: 255,
    array: false
  })
  meeting_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

