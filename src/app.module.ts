import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DB_CONFIG_CONNECTION } from './products/config';

@Module({
  imports: [ProductsModule,
    TypeOrmModule.forRoot(DB_CONFIG_CONNECTION),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
