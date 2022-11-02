import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filterReducer from '../slices/filterSlice'
import cartReducer from '../slices/cartSlice'
import pizzasReducer from '../slices/pizzasSlice'

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
