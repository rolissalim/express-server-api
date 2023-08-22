import { hash } from "bcryptjs";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DBTable } from "../../constants/DBTable";
import { User } from "./User";

@Entity(DBTable.OAUTH_TOKENS)
export class OauthToken {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  user_id: string;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @Column()
  expires_in: number;

  @Column()
  is_active: string;

  @ManyToOne((type) => User, (user) => user.oauthToken)
  @JoinColumn([
    { name: "user_id", referencedColumnName: "id" }
  ])
  users: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
