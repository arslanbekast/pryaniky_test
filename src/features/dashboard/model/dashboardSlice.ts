import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { dashboardApi } from '@/features/dashboard/api/dashboardApi'
import {
  Document,
  DocumentWithoutId,
  UpdateDocumentArgs,
} from '@/features/dashboard/api/dashboardApi.types'
import { createAppAsyncThunk } from '@/common/utils/createAppAsyncThunk'
import { Status } from '@/features/auth/model/authSlice'
import { handleApiRequest } from '@/features/dashboard/utils/handleApiRequest'

// **1. Получение данных**
export const fetchDocuments = createAppAsyncThunk<Document[], undefined>(
  'dashboard/fetchDocuments',
  async (_, { dispatch, rejectWithValue }) => {
    return (await handleApiRequest(
      () => dashboardApi.getDocuments(),
      dispatch,
      rejectWithValue
    )) as Promise<Document[]>
  }
)

// **2. Добавление документа**
export const addDocument = createAppAsyncThunk<Document, DocumentWithoutId>(
  'dashboard/addDocument',
  async (document, { dispatch, rejectWithValue }) => {
    return (await handleApiRequest(
      () => dashboardApi.addDocument(document),
      dispatch,
      rejectWithValue
    )) as Promise<Document>
  }
)

// **3. Обновление документа**
export const updateDocument = createAppAsyncThunk<Document, UpdateDocumentArgs>(
  'dashboard/updateDocument',
  async (args, { dispatch, rejectWithValue }) => {
    return (await handleApiRequest(
      () => dashboardApi.updateDocument(args),
      dispatch,
      rejectWithValue
    )) as Promise<Document>
  }
)

// **4. Удаление документа**
export const deleteDocument = createAppAsyncThunk<string, string>(
  'dashboard/deleteDocument',
  async (documentId, { dispatch, rejectWithValue }) => {
    return (await handleApiRequest(
      () => dashboardApi.deleteDocument(documentId),
      dispatch,
      rejectWithValue,
      documentId
    )) as Promise<string>
  }
)

const initialState: InitialState = {
  documents: [],
  status: 'idle',
  error: null,
}
const dashboardSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDocuments.fulfilled, (state, action: PayloadAction<Document[]>) => {
        state.documents = action.payload
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload
        }
      })
      .addCase(addDocument.fulfilled, (state, action: PayloadAction<Document>) => {
        state.documents.push(action.payload)
      })
      .addCase(deleteDocument.fulfilled, (state, action: PayloadAction<string>) => {
        const index = state.documents.findIndex(doc => doc.id === action.payload)
        if (index !== -1) {
          state.documents.splice(index, 1)
        }
      })
      .addCase(updateDocument.fulfilled, (state, action: PayloadAction<Document>) => {
        const index = state.documents.findIndex(doc => doc.id === action.payload.id)
        if (index !== -1) {
          state.documents[index] = action.payload
        }
      })
      .addMatcher(isPending, state => {
        state.status = 'loading'
      })
      .addMatcher(isRejected, state => {
        state.status = 'failed'
      })
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded'
      })
  },
})

export const dashboardReducer = dashboardSlice.reducer

type InitialState = {
  documents: Document[]
  status: Status
  error: string | null
}
