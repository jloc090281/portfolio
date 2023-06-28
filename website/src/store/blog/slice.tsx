import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_BASE_URL } from 'utils/constants'

enum BlogStatus {
  Private = 1,
  Public = 2,
  Archived = 3
}

export type Post = {
  blogId: string;
  id: string;
  createdAt: string;
  comment: string;
}

export type Blog = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  status: BlogStatus;
  posts: Post[];
}



export interface BlogState {
  isLoading: boolean,
  list: Blog[],
  error?: string
}

const initialState: BlogState = {
  isLoading: false,
  list: [],
  error: undefined
}

export const fetchAllBlog = createAsyncThunk(
  'blogs/fetchAll',
  async () => {
    const res = await fetch(`${API_BASE_URL}/Blog`)
    return await res.json()
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBlog.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllBlog.fulfilled, (state, action) => {
      state.isLoading = false
      state.list = action.payload
    })
    builder.addCase(fetchAllBlog.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export default counterSlice.reducer
