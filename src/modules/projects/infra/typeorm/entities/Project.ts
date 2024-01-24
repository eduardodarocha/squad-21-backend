import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Expose } from 'class-transformer';

@Entity('projects')
class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  tags: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Project };
