import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Field, ID } from "type-graphql";
@Entity()
export class Photo {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  fileName: string;

  @Column()
  views: string;
}
