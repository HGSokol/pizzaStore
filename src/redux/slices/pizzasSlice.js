import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchPizzasItems = createAsyncThunk('pizza/fetchPizzasItems',
  async ({currentPage, sortBy, categoryRequest, order, search}) => {
    const { data } = await axios.get(
      `https://634846130484786c6e965029.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}${categoryRequest}&order=${order}&${search}`
    )

    return data
  }
)

const initialState ={
  items: [],
  isLoading: ''
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchPizzasItems.pending, state => {
        state.isLoading = 'loading'
        state.items = []
      })
      .addCase(fetchPizzasItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = 'success'
      })
      .addCase(fetchPizzasItems.rejected, state => {
        state.isLoading = 'error'
        state.items = []
      })
  }
})

export const selectPizzas = state => state.pizzasReducer

const {reducer} = pizzasSlice

export default reducer  