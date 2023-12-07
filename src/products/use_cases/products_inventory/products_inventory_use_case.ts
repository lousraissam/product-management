import { Inject } from "@nestjs/common";
import { AppError } from "src/products/domain/errors/AppError";
import { ProductError } from "src/products/domain/errors/ProductError";
import { ProductProps } from "src/products/domain/product";
import { ProductRepositoryInterface } from "src/products/repository/product_repository_interface";
import { UseCase } from "src/products/shared/use_case_interface";

//add error in type appError and notFoundError
export type GetProductInventoryResponse = {
    product: string,
    quantity:number,
    totalPrice: number,
    barCodes: string[]
} | ProductError.Notfount | AppError;

export class GetProductInventoryUseCase implements UseCase<string, GetProductInventoryResponse> {
    constructor(
        @Inject('product-repository') private productRepository: ProductRepositoryInterface,
      ) {}

    async excute(name: string): Promise<any> {
       try {
        name = name.trim().toLowerCase();
        const products = await this.productRepository.findAll({name});
        if (!products) {
            return ProductError.Notfount.create(`products with name ${name} not found`)
        }
        console.log('products of this name', products);

        const quantity = products.length;

        let totalPrice: number = 0;
        let barCodes: string[] = [];
        products.forEach(product => {
            totalPrice += (product as unknown as ProductProps).price;
            barCodes.push((product as unknown as ProductProps).barCode);
        })

        const result = {
            product:name,
            quantity,
            totalPrice,
            barCodes
        }
        console.log('result:', result);
        return result ;

       } catch (err) {
        console.error(err);
        return AppError.create('unexpected error occured', err);
       }
    }

}