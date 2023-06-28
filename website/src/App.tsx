import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState, AppDispatch } from 'store/store'
import { Blog, fetchAllBlog } from 'store/blog/slice'
import './App.css'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, list, error } = useSelector((state: RootState) => state.blog)
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined)

  useEffect(() => {
    dispatch(fetchAllBlog())
  }, [])

  const blogList = list.map((blog, index) => (
    <div key={index} className="blog-item" onClick={() => setSelectedBlog(blog)}>
      <span>{blog.title}</span>
    </div>
  ))

  const postList = selectedBlog?.posts.map((post, index) => (
    <div key={index} className="blog-item">
      <span>{post.comment}</span>
    </div>
  ))

  if (isLoading) return <div><span>Loading ...</span></div>

  return (
    <div className="container">
      <h1 className="blog-title">Blogs</h1>
      <div className="content">
        <div className="blog-list">
          {blogList}
        </div>
        <div className="post-list">
          {postList}
        </div>
      </div>
      <div>
        {error && <p className="error">
          {`Error on blog data fetching: ${error}`}
        </p>}
      </div>
    </div>
  )
}

export default App
