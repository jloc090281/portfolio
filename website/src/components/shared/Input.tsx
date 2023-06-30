import styled from 'styled-components'

const InputStyled = styled.input`
  padding: 10px;
  width: 96%;
  margin-right: 1rem;
  border: 0;
  &:focus-visible {
    outline: rgb(25, 118, 210) solid 1px;
  }
`

interface Props {
  disabled: boolean;
  value?: string;
  onChange: (value: string) => void;
}

const Input = ({ disabled, value, onChange }: Props) => {
  return <InputStyled disabled={disabled} value={value} onChange={(event: any) => onChange(event.target.value)} />
}

export default Input
