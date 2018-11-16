import { Product } from "./product";

export interface CartItem {
    cartId: string;
    productId: string;
    qty: number;
    product?: Product;
}
