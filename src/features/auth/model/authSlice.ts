import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '@/features/auth/api/authApi'
import { createAppAsyncThunk } from '@/common/utils/createAppAsyncThunk'
import { AuthData, LoginParams } from '@/features/auth/api/authApi.types'
import { handleServerNetworkError } from '@/common/utils/handleServerNetworkError'
import { setAppError } from '@/app/appSlice'

// Асинхронный action для авторизации
export const login = createAppAsyncThunk<AuthData | null, LoginParams>(
  'auth/login',
  async (authData, { dispatch, rejectWithValue }) => {
    try {
      const response = await authApi.login(authData)
      if (response.status === 200) {
        if (response.data.error_code === 0) {
          localStorage.setItem('token', response.data.data.token) // Сохраняем токен
          return response.data.data
        } else {
          return rejectWithValue('Неверное имя пользователя или пароль!')
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
)

const initialState: InitialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthData | null>) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.token = action.payload.token
          state.isAuthenticated = true
        }
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | null | undefined>) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export const authReducer = authSlice.reducer

type InitialState = {
  token: string | null
  isAuthenticated: boolean
  status: Status
  error: string | null | undefined
}
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'
