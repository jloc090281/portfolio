import styled from 'styled-components'
import { Post } from 'store/blog/slice'

const Container = styled.div`
  background-color: #FFF;
  height: auto;
  width: calc(100% - 3rem);
  cursor: default;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 0 8px 2px rgb(0 0 0 / 15%);
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
