
export interface User {
    id: string;
    userName: string;
    knownAs: string;
    age: number;
    gender: string;
    createdOn: Date;
    lastActive: Date;
    city: string;
    country: string;
    roles?: string[];
}
