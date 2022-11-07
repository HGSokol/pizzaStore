import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterSliceState, SortArr, SortPropertyEnum } from '../filter/types'

const initialState: FilterSliceState = {
  value: '',
  categoryId: 0,
  sort: {
      name: 'популярности (Возрастанию)',
      sortCategories: SortPropertyEnum.RATING_DESC,
  },
  currentPage: 1,
}

export const filterSlice = createSlice({
  name:'filter',
  initialState,
  reducers:{
    inputSort: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    changeCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    sortPizza: (state, action: PayloadAction<SortArr>) => {
      state.sort = action.payload
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
      state.currentPage = Number(action.payload.currentPage)
    }
  },
})

const {actions, reducer} = filterSlice

export const {inputSort, changeCategory, sortPizza, changePage, setFilters} = actions
export default reducer