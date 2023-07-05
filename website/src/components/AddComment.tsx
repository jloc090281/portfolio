import { useState } from 'react'
import styled from 'styled-components'

import { Grid, Input, Button } from 'components/shared'

const Container = styled.article`
  display: flex;
  column-gap: 12px;
  padding: 1rem;
  padding-bottom: 0;
  width: calc(100% - 2rem);
`

interface Props {
  disabled?: boolean;
  onButtonClick?: (value: string) => void;
}

export const AddComment = ({ disabled = false, onButtonClick }: Props) => {
  const [comment, setComment] = useState<string>('')

  const handleButtonClick = () => {
    setComment('')
    onButtonClick && onButtonClick(comment)
  }

  return (
    <Container>
      <Grid xs={10}>
        <Input disabled={disabled} value={comment} onChange={(event: { target: { value: string } }) => setComment(event.target.value)} />
      </Grid>
      <Grid xs={2}>
        <Button fullWidth label="Post" onClick={handleButtonClick} disabled={disabled || comment === ''} />
      </Grid>
    </Container>
  )
}