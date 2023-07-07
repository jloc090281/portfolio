import { useSelector, useDispatch } from 'react-redux'

import useScreenBreakpoint from 'hooks/useScreenSize'
import type { RootState, AppDispatch } from 'store/store'
import { setSelectedBlog, selectBlogList } from 'store/blog/slice'
import { Carousel, ScrollableList } from 'components/shared'
import { BlogCard } from 'components/BlogCard'
import { Blog } from 'store/blog/slice'
import { MEDIA_QUERIES } from 'utils/constants'

export const BlogList = () => {
  const screenBreakpoint = useScreenBreakpoint()
  const isMobileScreen = screenBreakpoint === MEDIA_QUERIES.XS
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
      {isMobileScreen
        ? <Carousel list={blogList} onMoveCallback={(id: number) => handleBlogAction(list[id])} />
        : <ScrollableList list={blogList} />
      }
    </>
  )
}
