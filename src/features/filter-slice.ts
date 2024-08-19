import { createSlice } from '@reduxjs/toolkit'

const initialState: { month: string } = {
  month: 'EastAsia_VNP14IMGTDL_NRT_FireData_2024-07-14_to_2024-08-14',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload
    },
  },
})

export const { setMonth } = filterSlice.actions
export default filterSlice.reducer
