import { EntitySchema } from 'typeorm';
import { Product } from '../domain/product';

export const ProductSchema = new EntitySchema<Product>({
  name: 'Product',
  target: Product,
  columns: {
    id: {
      type: String,
      primary: true,
    },
    name: {
      type: String ,
    },
    price: {
      type: 'float',
    },
    
    barCode: {
      type: String
    },
    state: {
      type: String
    },
  },
});