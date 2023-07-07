import styled from 'styled-components'
import { Post } from 'store/blog/slice'

const Container = styled.div`
  background: linear-gradient(to right, #e2e2e2, #c9d6ff);
  height: fit-content;
  width: calc(100% - 2rem);
  cursor: default;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 2px 2px 6px 2px rgb(0 0 0 / 35%);
`

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <Container>
      <span>{post.comment}</span>
    </Container>
  )
}
