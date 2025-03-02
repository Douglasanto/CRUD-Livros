export interface Book {
  id: string;
  name: string;
  author_id: string;
  pages?: number;
}

export interface Author {
  id: string;
  name: string;
  email?: string;
}