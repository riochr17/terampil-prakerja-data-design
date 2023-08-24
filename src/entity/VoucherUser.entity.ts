import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Voucher } from './Voucher.entity';
import { User } from './User.entity';


@Entity('VoucherUser')
export class VoucherUser {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Voucher, voucher => voucher.id)
  @JoinColumn({ name: 'voucher_id' })
  voucher!: Voucher;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;
}

