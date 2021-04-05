  import {
    CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class User {
  
    @PrimaryGeneratedColumn()
    readonly id: number;
  
    @CreateDateColumn()
    readonly createdAt: Date;
  
    @UpdateDateColumn()
    readonly updatedAt: Date;
  
  }
  