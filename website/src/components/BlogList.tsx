import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from 'store/store'
import { setSelectedBlog, selectBlogList } from 'store/blog/slice'
import { Carousel, ScrollableList } from 'components/shared'
import { BlogCard } from 'components/BlogCard'
import { Blog } from 'store/blog/slice'
import useScreenSize from 'hooks/useScreenSize'
import { MEDIA_QUERIES } from 'utils/constants'

const MobileView = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  @media (min-width: 480px) {
    display: none;
  }
`

const NonMobileView = styled.div`
  display: none;
  width: 100%;
  @media (min-width: 480px) {
    display: block;
  }
`

export const BlogList = () => {
  const screenSize = useScreenSize()
  const dispatch = useDispatch<AppDispatch>()
  const list = useSelector((state: RootState) => selectBlogList(state.blog))

  const columnsPerLine = screenSize === MEDIA_QUERIES.SM ? 2 : 3;

  const handleBlogAction = (blog: Blog) => {
    dispatch(setSelectedBlog(blog))
  }

  const blogList = list.map(blog => (
    <BlogCard key={blog.id} blog={blog} onClick={() => handleBlogAction(blog)}/>
  ))

  return (
    <>
      <MobileView>
        <Carousel list={blogList} onMoveCallback={(id: number) => handleBlogAction(list[id])} />
      </MobileView>
      <NonMobileView>
        <ScrollableList list={blogList} columnsPerLine={columnsPerLine}/>
      </NonMobileView>
    </>
  )
}
