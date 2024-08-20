import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  month: string
  dayNight: {
    day: boolean
    night: boolean
  }
}
const initialState: FilterState = {
  month: 'EastAsia_VNP14IMGTDL_NRT_FireData_2024-07-14_to_2024-08-14',
  dayNight: {
    day: true,
    night: true,
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload
    },
    setDay: (state, action: PayloadAction<boolean>) => {
      state.dayNight.day = action.payload
    },
    setNight: (state, action: PayloadAction<boolean>) => {
      state.dayNight.night = action.payload
    },
  },
})

export const { setMonth, setDay, setNight } = filterSlice.actions
export const selectDayNight = (state: RootState) => state.filter.dayNight
export default filterSlice.reducer
