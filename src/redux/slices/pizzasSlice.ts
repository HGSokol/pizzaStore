import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { RootState } from "../store";

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

export const fetchPizzasItems = createAsyncThunk<
  Pizza[],
  SearchPizzaParams
>('pizza/fetchPizzasItems',
  async ({currentPage, sortBy, categoryRequest, order, search}) => {
    const { data } = await axios.get<Pizza[]>(
      `https://634846130484786c6e965029.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}${categoryRequest}&order=${order}&${search}`
    )

    return data
  }
)


const initialState: PizzaSliceState = {
  items: [],
  isLoading: Status.LOADING
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers:{},
  extraReducers: builder => {
    builder
      .addCase(fetchPizzasItems.pending, state => {
        state.isLoading = Status.LOADING
        state.items = []
      })
      .addCase(fetchPizzasItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = Status.SUCCESS
      })
      .addCase(fetchPizzasItems.rejected, state => {
        state.isLoading = Status.ERROR
        state.items = []
      })
  }
})

export const selectPizzas = (state: RootState) => state.pizzasReducer

const {reducer} = pizzasSlice

export default reducer  