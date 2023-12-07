import { Module } from '@nestjs/common';
import { CreateProductController } from './use_cases/create_product/create_product_controller';
import { CreateProductUseCase } from './use_cases/create_product/create_product_use_case';
import { ProductRepository } from './repository/product_repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from './repository/product_schema';
import { GetProductByIdUseCase } from './use_cases/get_product_by_id/get_product_by_id_use_case';
import { GetProductByIdController } from './use_cases/get_product_by_id/get_product_by_id_controller';
import { GetProductsController } from './use_cases/get_all_products/get_products_controller';
import { GetProductsUseCase } from './use_cases/get_all_products/get_products_use_case';
import { DeleteProductUseCase } from './use_cases/delete_product/delete_product_use_case';
import { DeleteProducController } from './use_cases/delete_product/delete_product_controllet';
import { UpdateProductUseCase } from './use_cases/update_product/update_product_use_case';
import { UpdateProductController } from './use_cases/update_product/update_product_controller';
import { GetProductInventoryUseCase } from './use_cases/products_inventory/products_inventory_use_case';
import { GetProductInventoryController } from './use_cases/products_inventory/products_inventory_controllet';

@Module({
    imports: [TypeOrmModule.forFeature([ProductSchema])],

    providers: [
        {
            provide: 'create-product-use-case',
            useClass: CreateProductUseCase
        },
        {
            provide: 'get-product-use-case',
            useClass: GetProductByIdUseCase
        },
        {
            provide: 'get-products-use-case',
            useClass: GetProductsUseCase
        },
        {
            provide: 'update-product-use-case',
            useClass: UpdateProductUseCase
        },
        {
            provide: 'delete-product-use-case',
            useClass: DeleteProductUseCase
        },

        {
            provide: 'get-product-inventory-use-case',
            useClass: GetProductInventoryUseCase
        },


        {
            provide: 'product-repository',
            useClass: ProductRepository
        },
        

    ],
    controllers: [
        CreateProductController,
        GetProductInventoryController,
        GetProductByIdController,
        GetProductsController,
        UpdateProductController,
        DeleteProducController
    ]
})
export class ProductsModule {}
