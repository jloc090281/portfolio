import { useRef, ReactNode, MouseEvent, KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`

interface Props {
  open: boolean;
  children: ReactNode;
  closeOnBackdropClick?: boolean;
  enableCloseOnEscape?: boolean;
  onClose: () => void;
}

const Modal = ({ open, children, onClose, closeOnBackdropClick = true, enableCloseOnEscape = false }: Props) => {
  const backdropRef = useRef(null)

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdropClick || event.target !== backdropRef?.current) return
    onClose()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!enableCloseOnEscape || event.key !== 'Escape') return
    event.stopPropagation()
    onClose()
  }

  const Portal = ({ children }: {children: ReactNode }) => (
    <Backdrop ref={backdropRef} onClick={handleBackdropClick} tabIndex={0} onKeyDown={handleKeyDown}>
      {children}
    </Backdrop>
  )

  return (
    <>{open && createPortal(<Portal>{children}</Portal>, document.body)}</>
  );
}

export default Modal
