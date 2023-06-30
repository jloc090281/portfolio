import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from 'store/store'
import { Blog, fetchAllBlog } from 'store/blog/slice'
import { Carousel } from 'components/shared/Carousel'
import { ScrollableList } from 'components/shared/ScrollableList'
import { BlogCard } from 'components/BlogCard'
import { PostCard } from 'components/PostCard'
import { Input, Button } from 'components/shared'

const Container = styled.section`
  background-color: rgb(224,224,224);
  width: 100vw;
  height: 100vh;
  margin: 0;
  color: #5b5b5b;
  font-family: "Open Sans",Arial,sans-serif;
`

const Blogs = styled.article`
  display: flex;
  padding: 1rem;
  width: calc(100% - 2rem);
  height: 14rem;
`

const Posts = styled.article`
  padding: 0 1rem;
  width: calc(100% - 2rem);
  height: calc(100% - 25rem);
`

const Title = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  color: #5588d3;
  font-size: 3.4rem;
  font-weight: 300;
  line-height: 4.6rem;
`

const Footer = styled.article`
  display: flex;
  padding: 1rem;
  padding-bottom: 0;
  width: calc(100% - 2rem);
  align-items: center;
`

const ErrorMessage = styled.p`
  color: red;
`

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, list, error } = useSelector((state: RootState) => state.blog)
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined)
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    dispatch(fetchAllBlog())
  }, [])

  useEffect(() => {
    if (list[0]) setSelectedBlog(list[0])
  }, [list])

  const handleBlogCardClick = (blog: Blog) => {
    setSelectedBlog(blog)
  }

  const blogList = list.map(blog => (
    <BlogCard key={blog.id} blog={blog} onClick={handleBlogCardClick} />
  ))

  const postList = !selectedBlog ? [] : selectedBlog.posts.map(post => (
    <PostCard key={post.id} post={post} />
  ))

  if (isLoading) return <div><span>Loading ...</span></div>

  return (
    <Container>
      <Title>Blogs</Title>
      <Blogs>
        <Carousel list={blogList} onMoveCallback={(id: number) => setSelectedBlog(list[id])} />
      </Blogs>
      <Posts>
        <ScrollableList title='Comments' list={postList} />
      </Posts>
      <Footer>
        <Input disabled={!selectedBlog} value={comment} onChange={(value: string) => setComment(value)} />
        <Button label="Post" disabled={!selectedBlog || comment === ''} />
      </Footer>
      <div>
        {error && <ErrorMessage>
          {`Error on blog data fetching: ${error}`}
        </ErrorMessage>}
      </div>
    </Container>
  )
}

export default App
