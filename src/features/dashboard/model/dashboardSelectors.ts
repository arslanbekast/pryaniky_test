import { RootState } from '@/app/store'

export const selectDocuments = (state: RootState) => state.dashboard.documents
export const selectStatus = (state: RootState) => state.dashboard.status
export const selectError = (state: RootState) => state.dashboard.error
