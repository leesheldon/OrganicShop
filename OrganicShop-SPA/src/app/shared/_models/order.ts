import { OrderDetails } from "./order-details";

export interface Order {
    id: string;
    userName: string;
    addressline1: string;
    addressline2: string;
    orderTotal: number;    
    orderDate: Date;
    dateOfReceiving: Date;
    city: string;
    country: string;
    orderDetails?: OrderDetails[];
}

