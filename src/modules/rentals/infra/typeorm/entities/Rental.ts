import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Car } from "../../../../cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @Column()
  car_id: string;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  end_date: Date;

  @CreateDateColumn()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export { Rental };
