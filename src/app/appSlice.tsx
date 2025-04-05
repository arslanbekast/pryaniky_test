import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: InitialState = {
  error: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
export const { setAppError } = appSlice.actions

type InitialState = {
  error: null | string
}
