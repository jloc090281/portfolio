import styled from 'styled-components'
import { Blog } from 'store/blog/slice'

const Container = styled.div`
  height: 6rem;
  cursor: pointer;
`

interface Props {
  blog: Blog;
  onClick: (blog: Blog) => void;
}

export const BlogCard = ({ blog, onClick}: Props) => {
  return (
    <Container onClick={() => onClick(blog)}>
      <span>{blog.title}</span>
    </Container>
  )
}