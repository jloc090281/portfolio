import styled from 'styled-components'
import { Post } from 'store/blog/slice'

const Container = styled.div`
  background-color: #FFF;
  height: auto;
  width: calc(100% - 3rem);
  cursor: default;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  &: last-child {
    margin-bottom: 0;
  }
`

const PostItemText = styled.span`
  color: #000;
`

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <Container>
      <PostItemText>{post.comment}</PostItemText>
    </Container>
  )
}
