import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DBTable } from "../../constants/DBTable";
import { IsNumber } from "class-validator";
@Entity(DBTable.ITEMS)
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  purchase_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  selling_price: number;

  @Column()
  @IsNumber()
  stock: number;

  @Column()
  image: string;

  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;

  toResponse(): Item {

    return {
      ...this

    } as Item    // return responseItem;
  }

  static getSearchableColumns() {
    return ["name"]
  }

  static getSearchableParams() {
    return {}
  }



}