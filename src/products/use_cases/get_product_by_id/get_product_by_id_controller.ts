import { Body, Controller, Get, HttpCode, Inject, InternalServerErrorException, NotFoundException, Param, Post } from "@nestjs/common";
import { UseCase } from "src/products/shared/use_case_interface";
import { GetProductByIdResponse } from "./get_product_by_id_use_case";
import { ProductError } from "src/products/domain/errors/ProductError";
import { AppError } from "src/products/domain/errors/AppError";

@Controller('api/product')
export class GetProductByIdController {
    
    constructor(
        @Inject('get-product-use-case')
        private useCase: UseCase<string, GetProductByIdResponse>
    ){}

    @Get('/:id')
    @HttpCode(200)
    async fetchProduct(
        @Param('id') id: string,
    ): Promise<GetProductByIdResponse> {
       const result = await this.useCase.excute(id);
       console.log('result', result);
       if(result instanceof ProductError.Notfount ) {
        throw new NotFoundException(`product ${id} not found`)
       }
       if (result instanceof AppError) {
        throw new InternalServerErrorException(`unexpected error occured`)
       }
       return result;
    }

}