import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "src/products/shared/use_case_interface";
import { Product, ProductProps } from "src/products/domain/product";
import { ProductRepositoryInterface } from "src/products/repository/product_repository_interface";
import { UpdateProductDto } from "./update_product_dto";

export type UpdateProductResponse = Product | unknown ;

@Injectable()
export class UpdateProductUseCase implements UseCase<UpdateProductDto, UpdateProductResponse> {
    constructor(
        @Inject('product-repository') private productRepository: ProductRepositoryInterface,
      ) {}

     async excute(request: UpdateProductDto): Promise<UpdateProductResponse> {
        const product = Product.create(request as ProductProps);
        try{
        await this.productRepository.update(request.id, product);
        } catch(err) {
            console.error(err);
        }
        return product;
    }
}