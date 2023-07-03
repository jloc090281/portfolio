import { useState } from 'react'
import styled from 'styled-components'

import { Input, Button } from 'components/shared'

const Container = styled.article`
  display: flex;
  padding: 1rem;
  padding-bottom: 0;
  width: calc(100% - 2rem);
`

interface Props {
  disabled?: boolean;
  onButtonClick?: (value: string) => void;
}

export const BlogFooter = ({ disabled = false, onButtonClick }: Props) => {
  const [comment, setComment] = useState<string>('')

  const handleButtonClick = () => {
    setComment('')
    onButtonClick && onButtonClick(comment)
  }

  return (
    <Container>
      <Input disabled={disabled} value={comment} onChange={(value: string) => setComment(value)} />
      <Button label="Post" onClick={handleButtonClick} disabled={disabled || comment === ''} />
    </Container>
  )
}