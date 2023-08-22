import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";
import { Item } from "@/database/entities/Item";
import { isFloat32Array } from "util/types";

export class createItemDTO {
    id?: string;

    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    purchase_price: number;

    @IsNotEmpty()
    @IsNumber()
    selling_price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

}

export class updateItemDTO {
    id?: string;

    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    purchase_price: number;

    @IsNotEmpty()
    @IsNumber()
    selling_price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;
}

