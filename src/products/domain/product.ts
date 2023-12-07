import { v4 as uuid } from 'uuid';

export type ProductProps = {
    name: string;
    price: number;
    barCode : string;
    state: string | null;
}

export class Product {

    private _props: ProductProps;
    private _id: string;

    private constructor(props: ProductProps, id?:string) {
        this._props = props;
        this._id = id ?? uuid()
    }

    // get id() { return this._id; }
    // get props() { return this._props; }

    public static create(props: ProductProps, id?:string) {
        if(!id) {
            id = uuid();
        }
        const product = new Product(props, id);
        return product;
    }
}