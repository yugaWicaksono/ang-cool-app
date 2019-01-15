import { Column, PrimaryGeneratedColumn, Entity /*OneToMany */ } from "typeorm";
import { Field, ID } from "type-graphql";
@Entity()
export class Photo {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  //@OneToMany()
  @Column({ type: "int" })
  UserID: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  fileName: string;

  @Column()
  path: string;
}
