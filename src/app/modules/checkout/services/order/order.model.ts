export interface Order {
  promotion?: string;
  products: ProductLine[];
}

interface ProductLine {
  id: string;
  qty: number;
}
