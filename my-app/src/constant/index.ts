// export const BaseUrl = "http://localhost:4000/api";
export const BaseUrl = "https://3c84-103-226-202-200.ngrok-free.app/api";

export interface loginProps {
  token: string;
  name: string;
  id: number;
  email: string;
  role?: string;
}

export interface User {
  token?: string;
  id: string;
  name: string;
  email: string;
  role?: string;
  tasks?: Task[];
}

export interface Task {
  id?:number;
  title: string;
  description?: string;
  dueDate?: Date;
  status?:string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  images: string[];
  stock: number;
  createdAt: string; // ISO date string
  updatedAt: string;
  categoryId: number;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}


export interface CartItem {
  id: number;
  quantity: number;
  prdocutId:number;
  product: Product;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}
