import { Dispatch } from '@reduxjs/toolkit'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { setAppError } from '@/app/appSlice'
import { BaseResponse } from '@/common/types/common.types'
import { AxiosResponse } from 'axios'

export async function handleApiRequest<T>(
  asyncRequest: () => Promise<AxiosResponse<BaseResponse<T>>>,
  dispatch: Dispatch,
  rejectWithValue: (value: string | null) => unknown,
  documentId?: string
): Promise<T | unknown> {
  try {
    const response = await asyncRequest()

    if (response.status === 200) {
      if (response.data.error_code === 0) {
        return documentId ? (documentId as T) : (response.data.data as T)
      } else {
        return rejectWithValue(response.data.error_message || 'Ошибка сервера')
      }
    } else {
      dispatch(setAppError(response.statusText))
      return rejectWithValue(null)
    }
  } catch (error: unknown) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
}
