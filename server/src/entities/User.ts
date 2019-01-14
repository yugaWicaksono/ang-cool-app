import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  /* ID decorator will tell graphql that this field is an incremental ID field
   */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  /* the field decorator will send the query back to the user aka can be used in the front end
   and this are the field required to be filled in by the user
  */
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("INTEGER")
  age: number;

  @Field()
  @Column({ unique: true })
  email: string;

  /* this column will not be visible for the user and only can be used inside the database*/

  @Column()
  password: string;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updatedAt: Date;

  /*this is schema field and is not saved into the database*/
  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}
