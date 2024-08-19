import { configureStore } from '@reduxjs/toolkit'
import menuSlice from '@/features/menu-slice'
import filterSlice from '@/features/filter-slice'

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    filter: filterSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
