import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  isPostingToBlog: boolean,
  error?: string
}

const initialState: BlogState = {
  isLoading: false,
  list: [],
  isPostingToBlog: false,
  error: undefined
}

export const fetchAllBlog = createAsyncThunk(
  'blogs/fetchAll',
  async () => {
    const res = await fetch(`${API_BASE_URL}/Blog`)
    return await res.json()
  }
)

export const postToBlog = createAsyncThunk(
  'blogs/postToBlog',
  async (post: { blogId: string; comment: string; }) => {
    const res = await fetch(`${API_BASE_URL}/Blog/Post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    return await res.json()
  }
)

export const counterSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBlog.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllBlog.fulfilled, (state, { payload }: { payload: Blog[] }) => {
      state.isLoading = false
      state.list = payload
    })
    builder.addCase(fetchAllBlog.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(postToBlog.pending, (state) => {
      state.isPostingToBlog = true
    })
    builder.addCase(postToBlog.fulfilled, (state, { payload }: { payload: Post }) => {
      state.isPostingToBlog = false
      state.list = state.list.map(item => item.id === payload.blogId ? { ...item, posts: [...item.posts, payload]} : item )
    })
    builder.addCase(postToBlog.rejected, (state, action) => {
      state.isPostingToBlog = false
      state.error = action.error.message
    })
  },
})

export default counterSlice.reducer
