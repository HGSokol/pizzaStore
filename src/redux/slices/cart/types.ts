export type CartItem = {
  id: string;
  imageUrl: string;
  price: number;
  sizes: string;
  title: string;
  types: string; 
  count: number;
}

export interface CartSliceState {
  totalPrice: number;
  items: CartItem []
}