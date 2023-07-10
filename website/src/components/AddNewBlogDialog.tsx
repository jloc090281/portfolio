import { Modal } from 'components/shared'
import { BlogForm } from 'components/BlogForm'
import styled from 'styled-components'

const ModalContainer = styled.div`
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
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleOnSubmit: (values: { [key: string]: any }) => void;
}

export const AddNewBlogDialog = ({ isOpen, setIsOpen, handleOnSubmit }: Props) => {
  return (
    <Modal enableCloseOnEscape={true} open={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContainer>
        <Title>Add new Blog</Title>
        <BlogForm onClose={() => setIsOpen(false)} onSubmit={handleOnSubmit}/>
      </ModalContainer>
    </Modal>
  )
}
