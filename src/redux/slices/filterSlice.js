import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:'',
  categoryId: 0,
  sort: {
      name:'популярности (Возрастанию)',
      sortCategories:'rating',
  },
  currentPage: 1,
}

export const filterSlice = createSlice({
  name:'filter',
  initialState,
  reducers:{
    inputSort: (state, action) => {
      state.value = action.payload
    },
    changeCategory: (state,action) => {
      state.categoryId = action.payload
    },
    sortPizza: (state, action) => {
      state.sort = action.payload
    },
    changePage: (state,action) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
      state.currentPage = Number(action.payload.currentPage)
    }
  },
})

const {actions, reducer} = filterSlice

export const {inputSort, changeCategory, sortPizza, changePage, setFilters} = actions
export default reducer