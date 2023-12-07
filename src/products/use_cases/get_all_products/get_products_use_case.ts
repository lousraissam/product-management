import { Inject } from "@nestjs/common";
import { AppError } from "src/products/domain/errors/AppError";
import { ProductError } from "src/products/domain/errors/ProductError";
import { Product } from "src/products/domain/product";
import { ProductRepositoryInterface } from "src/products/repository/product_repository_interface";
import { UseCase } from "src/products/shared/use_case_interface";

//add error in type appError and notFoundError
export type GetProductsResponse = Product[] | ProductError.Notfount | AppError;

export class GetProductsUseCase implements UseCase<string, GetProductsResponse> {
    constructor(
        @Inject('product-repository') private productRepository: ProductRepositoryInterface,
      ) {}

   async excute(): Promise<GetProductsResponse> {
       try {
        const products = await this.productRepository.findAll();
        if (!products) {
          return ProductError.Notfount.create('no products found');
        }
        return products;
       } catch (err) {
        console.error(err);
        return AppError.create('unexpected Error occured');
       }
    }

}