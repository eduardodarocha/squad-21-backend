import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Expose } from 'class-transformer';
import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('projects')
class Project {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column()
  tags: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getImageUrl(): string | null {
    if (this.image) {
      switch (process.env.STORAGE_DRIVER) {
        case 'disk':
          return `${process.env.APP_API_URL}/images/${this.image}`;
        case 's3':
          return `${process.env.AWS_BUCKET_URL}/${this.image}`;
        default:
          return null;
      }
    } else {
      return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Project };
