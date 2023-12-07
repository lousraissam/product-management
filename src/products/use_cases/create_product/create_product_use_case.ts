import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "src/products/shared/use_case_interface";
import { CreateProductDto } from "./create_product_dto";
import { Product } from "src/products/domain/product";
import { ProductRepositoryInterface } from "src/products/repository/product_repository_interface";
import { ProductError } from "src/products/domain/errors/ProductError";
import { AppError } from "src/products/domain/errors/AppError";

export type CreateProductResponse = Product | ProductError.InvalidData | AppError ;

@Injectable()
export class CreateProductUseCase implements UseCase<CreateProductDto, CreateProductResponse> {
    constructor(
        @Inject('product-repository') private productRepository: ProductRepositoryInterface,
      ) {}

     async excute(request: CreateProductDto): Promise<CreateProductResponse> {
        const product = Product.create(request);
            if (!(product instanceof Product) || !product) {
                return ProductError.InvalidData.create('invalid data for product');
            }    
        try{
        await this.productRepository.save(product);
        } catch(err) {
            console.error(err);
            return AppError.create('unexpected error creating')
        }
        return product;
    }
}