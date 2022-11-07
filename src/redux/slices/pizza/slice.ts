import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from "../pizza/types";

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

const {reducer} = pizzasSlice

export default reducer 