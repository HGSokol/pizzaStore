export interface ItemPizza{
  category: number,
  id: string,
  imageUrl: string,
  ingredients: string,
  price: number,
  rating: number,
  sizes: number[],
  title: string,
  types: number[]
}

export interface CartItems extends ItemPizza {
  count: number;
  type: string;
}