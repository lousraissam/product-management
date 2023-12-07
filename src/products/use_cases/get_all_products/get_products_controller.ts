import {  Controller, Get, HttpCode, Inject, InternalServerErrorException, NotFoundException, Param, Post } from "@nestjs/common";
import { UseCase } from "src/products/shared/use_case_interface";
import { GetProductsResponse } from "./get_products_use_case";
import { ProductError } from "src/products/domain/errors/ProductError";
import { AppError } from "src/products/domain/errors/AppError";

@Controller('api/product')
export class GetProductsController {
    
    constructor(
        @Inject('get-products-use-case')
        //TODO: implement dto for pagination...
        private useCase: UseCase<string, GetProductsResponse
        >
    ){}

    @Get('/')
    @HttpCode(200)
    async fetchProduct(
    ): Promise<GetProductsResponse> {
       const result = await this.useCase.excute();

       if(result instanceof ProductError.Notfount ) {
        throw new NotFoundException(`products not found`)
       }
       if (result instanceof AppError) {
        throw new InternalServerErrorException(`unexpected error occured`)
       }
       return result;
    }

}