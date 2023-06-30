import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from 'store/store'
import { Blog, fetchAllBlog } from 'store/blog/slice'
import { Carousel } from 'components/shared/Carousel'
import { BlogCard } from 'components/BlogCard'
import { PostCard } from 'components/PostCard'
import { Input, Button } from 'components/shared'

const Container = styled.div`
  background-color: rgb(224,224,224);
  width: 100vw;
  height: 100vh;
  margin: 0;
  color: #5b5b5b;
  font-family: "Open Sans",Arial,sans-serif;
`

const BlogContainer = styled.div`
  display: flex;
  padding: 1rem;
  width: calc(100% - 2rem);
  height: 14rem;
`

const PostContainer = styled.div`
  margin: 1rem;
  padding: 0.5rem 0;
  width: calc(100% - 2rem);
  height: 9rem;
  overflow-y: auto;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin: 0;
  color: #5588d3;
  font-size: 3.4rem;
  font-weight: 300;
  line-height: 4.6rem;
`

const SubTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  margin: 0;
  color: #5588d3;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 4.6rem;
`

const ActionContainer = styled.div`
  display: flex;
  margin: 1rem;
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
  const postContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchAllBlog())
  }, [])

  useEffect(() => {
    if (list[0]) setSelectedBlog(list[0])
  }, [list])

  useEffect(() => {
    if (postContainerRef?.current) postContainerRef.current.scrollTo(0, 0)
  }, [postContainerRef, selectedBlog])

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
      <BlogContainer>
        <Carousel list={blogList} />
      </BlogContainer>
      <SubTitle>Comments</SubTitle>
      <PostContainer ref={postContainerRef}>
        {postList}
      </PostContainer>
      <ActionContainer>
        <Input disabled={!selectedBlog} value={comment} onChange={(value: string) => setComment(value)} />
        <Button label="Post" disabled={!selectedBlog || comment === ''} />
      </ActionContainer>
      <div>
        {error && <ErrorMessage>
          {`Error on blog data fetching: ${error}`}
        </ErrorMessage>}
      </div>
    </Container>
  )
}

export default App
