import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filterReducer from '../slices/filter/slice'
import cartReducer from '../slices/cart/slice'
import pizzasReducer from '../slices/pizza/slice'

export const store = configureStore({
  reducer:{
    filterReducer,
    cartReducer,
    pizzasReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
