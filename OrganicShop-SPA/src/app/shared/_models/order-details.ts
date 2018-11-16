import { Product } from "./product";

export interface OrderDetails {
    orderId: string;
    productId: string;
    qty: number;
    product?: Product;
}
