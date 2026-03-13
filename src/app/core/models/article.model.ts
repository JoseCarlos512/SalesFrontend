export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Article {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
}
