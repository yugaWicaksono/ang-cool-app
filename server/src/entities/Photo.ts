import { Column, PrimaryColumn, Entity } from "typeorm";

@Entity()
export class Photo {
  @PrimaryColumn("int", { generated: true })
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
