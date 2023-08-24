import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";
import { Item } from "@/database/entities/Item";
import { isFloat32Array } from "util/types";

export class createItemDTO {
    id?: string;

    @IsString()
    @IsUnique(Item, "name")
    name: string;

    @IsNotEmpty()
    purchase_price: number;

    @IsNotEmpty()
    selling_price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

}

export class updateItemDTO {
    id?: string;

    @IsString()
    @IsUnique(Item, "name")
    name: string;

    @IsNotEmpty()
    purchase_price: number;

    @IsNotEmpty()
    selling_price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;
}

