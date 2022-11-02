import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type CartItem = {
  id: string;
  imageUrl: string;
  price: number;
  sizes: string;
  title: string;
  types: string; 
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem []
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if(findItem){
        findItem.count ++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = state.items.reduce((e,i) => e + (i.price * i.count) ,0)
    },
    removeItem: (state, action: PayloadAction<string> ) => {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((e,i) => e + (i.price * i.count) ,0)
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
    },
    minusItems: (state, action: PayloadAction<string>) => {
      const addItem = state.items.find(obj => obj.id === action.payload)
      if(addItem){
        addItem.count -= 1
      }
      
      state.totalPrice = state.items.reduce((e,i) => e + (i.price * i.count) ,0)
    }
  },
})

export const selectCart = (state: RootState) => state.cartReducer

const { actions, reducer } = cartSlice

export const { addItem, removeItem, clearCart, minusItems } = actions
export default reducer;