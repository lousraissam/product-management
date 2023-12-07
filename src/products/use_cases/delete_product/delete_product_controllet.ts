import { Body, Controller, Delete, Get, HttpCode, Inject, InternalServerErrorException, Param, Post } from "@nestjs/common";
import { UseCase } from "src/products/shared/use_case_interface";
import { DeleteProductResponse } from "./delete_product_use_case";
import { AppError } from "src/products/domain/errors/AppError";

@Controller('api/product')
export class DeleteProducController {
    
    constructor(
        @Inject('delete-product-use-case')
        private useCase: UseCase<string, DeleteProductResponse>
    ){}

    @Delete('/:id')
    @HttpCode(204)
    async deleteProduct(
        @Param('id') id: string,
    ): Promise<DeleteProductResponse> {
       const result = await this.useCase.excute(id);
       if (result instanceof AppError) {
        throw new InternalServerErrorException(`unexpected error occured`)
       }
    }
}