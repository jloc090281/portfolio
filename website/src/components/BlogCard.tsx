import styled from 'styled-components'
import { Blog } from 'store/blog/slice'

const Container = styled.div`
  background: linear-gradient(to bottom right, #1cb5e0, #000046);
  display: flex;
  flex-direction: column;
  height: calc(100% - 3rem);
  width: calc(100% - 3rem);
  cursor: default;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 0 8px 2px rgb(0 0 0 / 50%);
`

const Title = styled.span`
  font-weight: 600;
  color: #c9d6ff;
  font-size: 23px;
  font-weight: 700;
  line-height: normal;
  width: fit-content;
  transition: .3s ease all;
  margin-bottom: 0.5rem;
  :
`

const Description = styled.span`
  font-weight: 400;
  color: #FFF;
`

interface Props {
  blog: Blog;
  onClick: (blog: Blog) => void;
}

export const BlogCard = ({ blog, onClick}: Props) => {
  return (
    <Container onClick={() => onClick(blog)}>
      <Title>{blog.title}</Title>
      <Description>{blog.description}</Description>
    </Container>
  )
}