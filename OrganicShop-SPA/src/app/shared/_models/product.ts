import { Category } from "./category";

export interface Product {
    id: string;
    title: string;
    price: number;    
    photoUrl: string;    
    categoryId: string;
    category?: Category;
    inActive: boolean;
    dateCreated: Date;
}
