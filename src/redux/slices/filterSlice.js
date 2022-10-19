import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:''
}

export const filterSlice = createSlice({
  name:'filter',
  initialState,
  reducers:{
    filtered: (state, action) => {
      state.value = action.payload
    }
  },
})

const {actions, reducer} = filterSlice

export default reducer
export const {filtered} = actions