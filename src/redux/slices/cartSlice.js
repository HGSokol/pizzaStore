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
    removeItem: (state, action) => {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = state.items.reduce((e,i) => e + (i.price * i.count) ,0)
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
    },
    minusItems: (state, action) => {
      const addItem = state.items.find(obj => obj.id === action.payload)
      addItem.count -= 1
      
      state.totalPrice = state.items.reduce((e,i) => e + (i.price * i.count) ,0)
    }
  },
})

const { actions, reducer } = cartSlice

export const { addItem, removeItem, clearCart, minusItems } = actions
export default reducer;