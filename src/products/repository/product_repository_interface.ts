import { Product, ProductProps } from "../domain/product";

export interface ProductRepositoryInterface {
    save(product: Product): Promise<Product>;
    find(id: string): Promise<Product>;
    findAll(prop?: Partial<ProductProps & {id: string}>): Promise<Product[]>;
    update(id: string, product: Product): Promise<Product>;
    delete(id: string): Promise<void>;

}