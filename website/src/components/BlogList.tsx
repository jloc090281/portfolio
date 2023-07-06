import { useSelector, useDispatch } from 'react-redux'

import type { RootState, AppDispatch } from 'store/store'
import { setSelectedBlog, selectBlogList } from 'store/blog/slice'
import { Carousel } from 'components/shared'
import { BlogCard } from 'components/BlogCard'
import { Blog } from 'store/blog/slice'

export const BlogList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const list = useSelector((state: RootState) => selectBlogList(state.blog))

  const handleBlogAction = (blog: Blog) => {
    dispatch(setSelectedBlog(blog))
  }

  const blogList = list.map(blog => (
    <BlogCard key={blog.id} blog={blog} onClick={() => handleBlogAction(blog)}/>
  ))

  return (
    <>
      <Carousel list={blogList} onMoveCallback={(id: number) => handleBlogAction(list[id])} />
    </>
  )
}
