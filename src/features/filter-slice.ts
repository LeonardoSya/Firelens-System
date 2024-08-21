import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  date: string
  dayNight: {
    day: boolean
    night: boolean
  }
}
const initialState: FilterState = {
  date: '20240714-20240814',
  dayNight: {
    day: true,
    night: true,
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload
    },
    setDay: (state, action: PayloadAction<boolean>) => {
      state.dayNight.day = action.payload
    },
    setNight: (state, action: PayloadAction<boolean>) => {
      state.dayNight.night = action.payload
    },
  },
})

export const { setDate, setDay, setNight } = filterSlice.actions
export const selectDayNight = (state: RootState) => state.filter.dayNight
export default filterSlice.reducer
