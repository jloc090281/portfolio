import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from 'store/store'
import { Blog, fetchAllBlog } from 'store/blog/slice'
import { BlogCard } from 'components/BlogCard'

const Container = styled.div`
  width: calc(100vw - 2rem);
  height: calc(100vh - 2rem);
  margin: 1rem;
`

const BlogContainer = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: calc(100% - 1rem);
  height: 9rem;
  overflow-y: auto;
`

const PostContainer = styled.div`
  padding: 0.5rem;
  width: calc(100% - 1rem);
  height: calc(100% - 26rem);
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
  max-height: 4rem;
  cursor: pointer;
  padding: 0.5rem;
  overflow-y: auto;
`

const ActionContainer = styled.div`
  display: flex;
  width: calc(100% - 1rem);
  align-items: center;
`

const CommentInput = styled.input`
  padding: 10px;
  width: 96%;
  margin-right: 1rem;
`

const PostButton = styled.button`
  height: 2rem;
  width: 100px;
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

  const blogList = list.map(blog => (
    <BlogCard key={blog.id} onClick={() => setSelectedBlog(blog)} blog={blog} />
  ))

  const postList = !selectedBlog ? [] : selectedBlog.posts.map(post => (
    <PostItem key={post.id}>
      <span>{post.comment}</span>
    </PostItem>
  ))

  if (isLoading) return <div><span>Loading ...</span></div>

  return (
    <Container>
      <Title>Blogs</Title>
      <BlogContainer>
        {blogList}
      </BlogContainer>
      <PostContainer>
        {postList}
      </PostContainer>
      <ActionContainer>
        <CommentInput value={comment} onChange={(input) => setComment(input.target.value)} />
        <PostButton/>
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
