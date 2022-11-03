import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getItemFromLs } from "../../../utils/getItemFromLocalStorage";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { CartItem, CartSliceState } from "./types";

const { items, totalPrice } = getItemFromLs()
const initialState: CartSliceState = {
  items,
  totalPrice,
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

      state.totalPrice = calcTotalPrice(state.items)
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

const { actions, reducer } = cartSlice

export const { addItem, removeItem, clearCart, minusItems } = actions
export default reducer;