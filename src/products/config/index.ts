import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Product } from "../domain/product";

export const DB_CONFIG_CONNECTION: TypeOrmModuleOptions = {
    autoLoadEntities: true,
    type: 'mysql',
    host: process.env.DB_HOST ?? 'db',
    port: 3306,
    username: process.env.MYSQL_USER ?? 'admin',
    password: process.env.MYSQL_PASSWORD ?? 'admin',
    database: process.env.MYSQL_DATABASE ??'db',
    entities: [Product],
    synchronize: true,
  }