import { Inject } from "@nestjs/common";
import { AppError } from "src/products/domain/errors/AppError";
import { Product } from "src/products/domain/product";
import { ProductRepositoryInterface } from "src/products/repository/product_repository_interface";
import { UseCase } from "src/products/shared/use_case_interface";

//add error in type appError and notFoundError
export type DeleteProductResponse = void | AppError;

export class DeleteProductUseCase implements UseCase<string, DeleteProductResponse> {
    constructor(
        @Inject('product-repository') private productRepository: ProductRepositoryInterface,
      ) {}

    async excute(id: string): Promise<DeleteProductResponse> {
       try {
        await this.productRepository.delete(id);
       } catch (err) {
        console.error(err);
        return AppError.create('unexpected error occured');
       }
    }

}