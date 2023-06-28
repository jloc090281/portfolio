import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from 'store/store'
import { Blog, fetchAllBlog } from 'store/blog/slice'
import { BlogCard } from 'components/BlogCard'
import { Input, Button } from 'components/shared'

const Container = styled.div`
  width: calc(100vw - 2rem);
  height: calc(100vh - 2rem);
  margin: 1rem;
`

const BlogContainer = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: calc(100% - 1rem);
  height: calc(100% - 20rem);
  overflow-y: auto;
`

const PostContainer = styled.div`
  padding: 0.5rem;
  width: calc(100% - 1rem);
  height: 9rem;
  overflow-y: auto;
`

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  margin: 0;
`

const PostItem = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: rgb(224,224,224);
  max-height: 4rem;
  cursor: default;
  padding: 1rem;
  overflow-y: auto;
  margin-bottom: 0.5rem;
  &: last-child {
    margin-bottom: 0;
  }
`

const PostItemText = styled.span`
  color: #000;
`

const ActionContainer = styled.div`
  display: flex;
  width: calc(100% - 1rem);
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
    if (postContainerRef?.current) postContainerRef.current.scrollTo(0, 0)
  }, [postContainerRef, selectedBlog])

  const handleBlogCardClick = (blog: Blog) => {
    setSelectedBlog(blog)
  }

  const blogList = list.map(blog => (
    <BlogCard key={blog.id} onClick={handleBlogCardClick} blog={blog} />
  ))

  const postList = !selectedBlog ? [] : selectedBlog.posts.map(post => (
    <PostItem key={post.id}>
      <PostItemText>{post.comment}</PostItemText>
    </PostItem>
  ))

  if (isLoading) return <div><span>Loading ...</span></div>

  return (
    <Container>
      <Title>Blogs</Title>
      <BlogContainer>
        {blogList}
      </BlogContainer>
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
