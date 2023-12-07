import { Product, ProductProps } from "../domain/product";
import { ProductRepositoryInterface } from "./product_repository_interface";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSchema } from "./product_schema";
import { AppError } from "../domain/errors/AppError";

export class ProductRepository implements ProductRepositoryInterface {
    constructor(
        @InjectRepository(ProductSchema)
        private readonly productRepository: Repository<Product>,
    ) {}

    async save(product: Product): Promise<Product> {
        const productParssed = JSON.parse(JSON.stringify(product));
        const productToPersisted = {...productParssed._props, id: productParssed._id, name: productParssed._props.name.trim().toLowerCase()};
        
        try {
            await this.productRepository.save(productToPersisted);
        } catch (err) {
            // TODO: add logging and return AppError
            console.error(err);
            throw new AppError('failed to save product', err);
        }
        return product;
    }

    async find(id: string): Promise<Product> {
        try {
            return await this.productRepository.findOneBy({id});
        } catch (err) {
            // TODO: add logging and return AppError
            console.error(err);
        }
    }

    async findAll(props?: Partial<ProductProps & {id: string}>): Promise<Product[]> {
        try {
            if(!props) {
                return await this.productRepository.find();
            }
            return await this.productRepository.findBy(props);

        } catch (err) {
            // TODO: add logging and return AppError
            console.error(err);
            throw new AppError('failed to save product', err);
        }
    }

    async delete(id: string): Promise<void> {
        try {
             await this.productRepository.delete(id);
        } catch (err) {
            // TODO: add logging and return AppError
            console.error(err);
            throw new AppError('failed to save product', err);
        }
    }

    async update(id: string, product: Product): Promise<Product> {
        const productParssed = JSON.parse(JSON.stringify(product));
        const productProps = productParssed._props;

        try {
            await this.productRepository.save({
                ...productProps,
                id: id,
            });
        } catch (err) {
            // TODO: add logging and return AppError
            console.error(err);
            throw new AppError('failed to save product', err);
        }
        return product;
    }
}
