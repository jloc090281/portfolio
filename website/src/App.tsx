import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from 'store/store'
import { Blog, fetchActiveBlogs, postToBlog } from 'store/blog/slice'
import { Carousel, ScrollableList } from 'components/shared'
import { AddBlogDialog } from 'components/AddBlogDialog'
import { BlogCard } from 'components/BlogCard'
import { PostCard } from 'components/PostCard'
import { AddComment } from 'components/AddComment'

const Container = styled.section`
  background-color: rgb(224,224,224);
  width: 100vw;
  height: 100vh;
  margin: 0;
  color: #5b5b5b;
`

const Title = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  color: #5588d3;
  font-size: 3.4rem;
  font-weight: 300;
`

const Blogs = styled.article`
  display: flex;
  padding: 1rem;
  padding-bottom: 0.5rem;
  width: calc(100% - 2rem);
  height: 14rem;
`

const BlogActions = styled.div`
  height: 3rem;
  padding-bottom: 0.5rem;
`

const Posts = styled.article`
  padding: 0 1rem;
  width: calc(100% - 2rem);
  height: calc(100% - 28rem);
`

const ErrorMessage = styled.p`
  color: red;
`

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, isPostingToBlog, list, error } = useSelector((state: RootState) => state.blog)
  const [selecteBlogId, setSelecteBlogId] = useState('')

  const selectedBlog = list.find(blog => blog.id === selecteBlogId)
  
  useEffect(() => {
    dispatch(fetchActiveBlogs())
  }, [])

  useEffect(() => {
    if (selecteBlogId === '' && list[0]) setSelecteBlogId(list[0].id)
  }, [list])

  const handleBlogCardClick = (blog: Blog) => {
    setSelecteBlogId(blog.id)
  }

  const handlePostToBlogOnClick = (comment: string) => {
    const post = {
      blogId: selectedBlog ? selectedBlog.id : '',
      comment: comment
    }
    dispatch(postToBlog(post))
  }

  const blogList = list.map(blog => (
    <BlogCard key={blog.id} blog={blog} onClick={handleBlogCardClick} />
  ))

  const postList = !selectedBlog || isPostingToBlog ? [] : selectedBlog.posts.map(post =>
    <PostCard key={post.id} post={post} />
  )

  if (isLoading) return <div><span>Loading ...</span></div>

  return (
    <Container>
      <Title>Blogs</Title>
      <Blogs>
        <Carousel list={blogList} onMoveCallback={(id: number) => setSelecteBlogId(list[id].id)} />
      </Blogs>
      <BlogActions>
        <AddBlogDialog />
      </BlogActions>
      <Posts>
        <ScrollableList title='Comments' list={postList} />
      </Posts>
      <AddComment onButtonClick={handlePostToBlogOnClick} disabled={!selectedBlog} />
      <div>
        {error && <ErrorMessage>
          {`Error on blog data fetching: ${error}`}
        </ErrorMessage>}
      </div>
    </Container>
  )
}

export default App
