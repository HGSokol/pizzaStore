export type Pizza = {
  category: number;
  id: string;
  imageUrl: string;
  ingredients: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
}

export type SearchPizzaParams = {
  currentPage:string; 
  sortBy: string; 
  categoryRequest:string; 
  order:string; 
  search:string; 
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: Pizza[];
  isLoading: Status;
}