import { RootState } from '@/app/store'

export const selectAppError = (state: RootState) => state.app.error
