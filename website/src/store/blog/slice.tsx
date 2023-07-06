import { createAsyncThunk, createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import { API_BASE_URL, BLOG_STATUS } from 'utils/constants'

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
  selectedBlog?: Blog,
  error?: string
}

const initialState: BlogState = {
  isLoading: false,
  list: [],
  selectedBlog: undefined,
  error: undefined
}

export const fetchActiveBlogs = createAsyncThunk(
  'blogs/fetchActiveBlogs',
  async () => {
    const body = { Status: BLOG_STATUS.ACTIVE }
    const res = await fetch(`${API_BASE_URL}/Blog/Filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
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

export const saveBlog = createAsyncThunk(
  'blogs/saveBlog',
  async (blog: { title: string; description: string; }) => {
    const res = await fetch(`${API_BASE_URL}/Blog/Save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    })
    return await res.json()
  }
)

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setSelectedBlog: (state, { payload }: PayloadAction<Blog>) => {
      state.selectedBlog = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActiveBlogs.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchActiveBlogs.fulfilled, (state, { payload }: { payload: Blog[] }) => {
      state.isLoading = false
      state.list = payload
      state.selectedBlog = payload[0]
    })
    builder.addCase(fetchActiveBlogs.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(postToBlog.fulfilled, (state, { payload }: { payload: Post }) => {
      state.list = state.list.map(item => item.id === payload.blogId ? { ...item, posts: [...item.posts, payload]} : item )
      state.selectedBlog = state.selectedBlog ? { ...state.selectedBlog, posts: [...state.selectedBlog.posts, payload] } : undefined
    })
    builder.addCase(postToBlog.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(saveBlog.fulfilled, (state, { payload }: { payload: Blog }) => {
      state.list = [...state.list, payload]
    })
    builder.addCase(saveBlog.rejected, (state, action) => {
      state.error = action.error.message
    })
  },
})

export const selectBlogList = (state: BlogState) => state.list

export const selectIsLoading = (state: BlogState) => state.isLoading

export const selectError = (state: BlogState) => state.error

export const selectSelectedBlog = (state: BlogState) => state.selectedBlog

export const { setSelectedBlog } = blogSlice.actions

export default blogSlice.reducer
