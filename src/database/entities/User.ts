import { hash } from "bcryptjs";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DBTable } from "../../constants/DBTable";
import { OauthToken } from "./OauthToken";
import { IsOptional } from "class-validator";
@Entity(DBTable.USERS)
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @IsOptional()
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => OauthToken, (oauthToken) => oauthToken.users)
  oauthToken: OauthToken[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password)
      this.password = await hash(this.password, 12);
  }

  toResponse(): User {

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      oauthToken: this.oauthToken,
    } as any    // return responseUser;
  }

  static getSearchableColumns() {
    return ["name"]
  }


  
}