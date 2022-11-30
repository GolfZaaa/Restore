export interface Product {
    id:              number;
    name:            string;
    description:     string;
    price:           number;
    pictureUrl:      string;
    quantityInStock: number;
    categoryId:      number;
    category:        Category;
}

export interface Category {
    id:   number;
    name: string;
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    category: string[];
    pageNumber: number;
    pageSize: number;
} 
