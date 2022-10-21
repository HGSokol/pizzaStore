import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    clearItems: (state) => {
      state.items = []
    },
  },
})

const { actions, reducer } = cartSlice

export const { addItem, removeItem, clearItems } = actions
export default reducer;