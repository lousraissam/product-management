import { Controller, Get, HttpCode, Inject, InternalServerErrorException, NotFoundException, Param, Post } from "@nestjs/common";
import { UseCase } from "src/products/shared/use_case_interface";
import { GetProductInventoryResponse } from "./products_inventory_use_case";
import { ProductError } from "src/products/domain/errors/ProductError";
import { AppError } from "src/products/domain/errors/AppError";

@Controller('api/product/inventory')
export class GetProductInventoryController {
    
    constructor(
        @Inject('get-product-inventory-use-case')
        private useCase: UseCase<string, GetProductInventoryResponse>
    ){}

    @Get('/:name')
    @HttpCode(200)
    async fetchProduct(
        @Param('name') name: string,
    ): Promise<GetProductInventoryResponse> {
       const result = await this.useCase.excute(name);
       if(result instanceof ProductError.Notfount ) {
        throw new NotFoundException(`product ${name} not found`)
       }
       if (result instanceof AppError) {
        throw new InternalServerErrorException(`unexpected error occured`)
       }
       return result;
    }

}