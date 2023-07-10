import { Modal } from 'components/shared'
import styled from 'styled-components'

import { Button } from 'components/shared'

const ModalContainer = styled.div`
  background-color: #FFF;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5b5b5b;
  padding: 1rem 2rem;
  border-radius: 5px;
  overflow-y: auto;
`

const Title = styled.span`
  color: #393939;
  font-size: 23px;
  font-weight: 700;
  line-height: normal;
`

const Message = styled.span`
  color: #393939;
  font-size: 18px;
  line-height: normal;
  padding: 2rem 0;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1rem;
`

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  setIsOpen: (value: boolean) => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

const ConfirmDialog = ({ isOpen, title, message, setIsOpen, onAccept, onCancel }: Props) => {
  const handleOnAccept = () => {
    setIsOpen(false)
    onAccept && onAccept()
  }

  const handleOnCancel = () => {
    setIsOpen(false)
    onCancel && onCancel()
  }

  return (
    <Modal enableCloseOnEscape={true} open={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Buttons>
          <Button label='Accept' onClick={handleOnAccept} />
          <Button label='Cancel' onClick={handleOnCancel} />
        </Buttons>
      </ModalContainer>
    </Modal>
  )
}

export default ConfirmDialog 
