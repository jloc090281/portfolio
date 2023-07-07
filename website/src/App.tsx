import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from 'store/store'
import { fetchActiveBlogs, selectIsLoading, selectError } from 'store/blog/slice'
import { AddBlogDialog } from 'components/AddBlogDialog'
import { BlogList } from 'components/BlogList'
import { CommentList } from 'components/CommentList'

const Container = styled.section`
  background-color: #1CB5E0;
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
  color: #FFF;
  font-size: 3.4rem;
  font-weight: 300;
`

const Blogs = styled.article`
  display: flex;
  padding: 1rem;
  padding-bottom: 0.5rem;
  width: calc(100% - 2rem);
  height: 12rem;
`

const BlogActions = styled.div`
  height: 3rem;
  padding-bottom: 0.5rem;
`

const Comments = styled.article`
  padding: 0 1rem;
  width: calc(100% - 2rem);
  height: calc(100% - 26rem);
`

const ErrorMessage = styled.p`
  color: red;
`

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const isLoading = useSelector((state: RootState) => selectIsLoading(state.blog))
  const error = useSelector((state: RootState) => selectError(state.blog))
  
  useEffect(() => {
    dispatch(fetchActiveBlogs())
  }, [])

  if (isLoading) return <div><span>Loading ...</span></div>

  return (
    <Container>
      <Title>Blogs</Title>
      <Blogs>
        <BlogList />
      </Blogs>
      <BlogActions>
        <AddBlogDialog onSubmit={(values: { [key: string]: any }) => console.log(values)} />
      </BlogActions>
      <Comments>
        <CommentList />
      </Comments>
      <div>
        {error && <ErrorMessage>
          {`Error on blog data fetching: ${error}`}
        </ErrorMessage>}
      </div>
    </Container>
  )
}

export default App
