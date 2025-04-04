import { RootState } from '@/app/store'

export const selectToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectStatus = (state: RootState) => state.auth.status
export const selectError = (state: RootState) => state.auth.error
