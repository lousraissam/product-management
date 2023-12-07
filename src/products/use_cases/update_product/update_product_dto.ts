import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
    id: string;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    barCode: string;

    state: string | null;

}