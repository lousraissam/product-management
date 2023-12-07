import { Body, Controller, HttpCode, Inject, Param, Patch } from "@nestjs/common";
import { UseCase } from "src/products/shared/use_case_interface";
import { UpdateProductDto } from "./update_product_dto";
import { UpdateProductResponse } from "./update_product_use_case";

@Controller('api/product')
export class UpdateProductController {
    
    constructor(
        @Inject('update-product-use-case')
        private useCase: UseCase<UpdateProductDto, UpdateProductResponse>
    ){}

    @Patch('/:id')
    @HttpCode(201)
    async updateProduct(
        @Param('id') id: string,
        @Body() body: UpdateProductDto
    ): Promise<UpdateProductResponse> {
        body.id = id;
       const result = await this.useCase.excute(body);
       return result;
    }

}