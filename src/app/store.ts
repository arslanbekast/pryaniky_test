import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@/app/appSlice'
import { authReducer } from '@/features/auth/model/authSlice'
import { dashboardReducer } from '@/features/dashboard/model/dashboardSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
