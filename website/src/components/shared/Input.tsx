import styled from 'styled-components'

const InputStyled = styled.input`
  padding: 10px;
  width: 96%;
  margin-right: 1rem;
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
