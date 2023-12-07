import { BadRequestException, Body, Controller, HttpCode, Inject, InternalServerErrorException, Post } from "@nestjs/common";
import { CreateProductDto } from "./create_product_dto";
import { UseCase } from "src/products/shared/use_case_interface";
import { CreateProductResponse } from "./create_product_use_case";
import { ProductError } from "src/products/domain/errors/ProductError";
import { AppError } from "src/products/domain/errors/AppError";

@Controller('api/product')
export class CreateProductController {
    
    constructor(
        @Inject('create-product-use-case')
        private useCase: UseCase<CreateProductDto, CreateProductResponse>
    ){}

    @Post('/')
    @HttpCode(201)
    async createProduct(
        @Body() body: CreateProductDto
    ): Promise<CreateProductResponse> {
       const result = await this.useCase.excute(body);
       if(result instanceof ProductError.InvalidData ) {
        throw new BadRequestException(`invalid data`)
       }
       if (result instanceof AppError) {
        throw new InternalServerErrorException(`unexpected error occured`)
       }
       return result;
    }

}