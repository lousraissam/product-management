import { Inject } from "@nestjs/common";
import { AppError } from "src/products/domain/errors/AppError";
import { ProductError } from "src/products/domain/errors/ProductError";
import { Product } from "src/products/domain/product";
import { ProductRepositoryInterface } from "src/products/repository/product_repository_interface";
import { UseCase } from "src/products/shared/use_case_interface";

//add error in type appError and notFoundError
export type GetProductByIdResponse = Product | ProductError.Notfount | AppError;

export class GetProductByIdUseCase implements UseCase<string, GetProductByIdResponse> {
    constructor(
        @Inject('product-repository') private productRepository: ProductRepositoryInterface,
      ) {}

    async excute(id: string): Promise<GetProductByIdResponse> {
       try {
        const product =  await this.productRepository.find(id);
        if (!product) {
          return ProductError.Notfount.create(`product with id ${id} not found`);
        }
        return product;
       } catch (err) {
        console.error(err);
        return AppError.create('failed to find product', err);
       }
    }
}