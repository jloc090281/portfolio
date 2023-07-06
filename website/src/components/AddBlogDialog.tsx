import { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import type { AppDispatch } from 'store/store'
import { saveBlog } from 'store/blog/slice'
import { Button, Modal } from 'components/shared'
import { BlogForm } from 'components/BlogForm'

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Container = styled.div`
  background-color: #FFF;
  width: calc(100vw - 4rem);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5b5b5b;
  padding: 1rem;
  border-radius: 5px;
  overflow-y: auto;
`

const Title = styled.span`
  color: #393939;
  font-size: 23px;
  font-weight: 700;
  line-height: normal;
`

interface Props {
  onSubmit: (values: { [key: string]: any }) => void;
}

export const AddBlogDialog = ({ onSubmit }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState(false)

  const handleOnSubmit = (values: { [key: string]: any }) => {
    dispatch(saveBlog(values))
    setIsOpen(false)
  }

  return (
    <>
      <Actions>
        <Button label='Add new blog' onClick={() => setIsOpen(true)} />
      </Actions>
      <Modal enableCloseOnEscape={true} open={isOpen} onClose={() => setIsOpen(false)}>
        <Container>
          <Title>Add new Blog</Title>
          <BlogForm onClose={() => setIsOpen(false)} onSubmit={handleOnSubmit}/>
        </Container>
      </Modal>
    </>
  )
}
