import { forwardRef, ForwardedRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
  box-sizing: border-box;
  position: relative;
  cursor: text;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  width: 100%;
`

const InputStyled = styled.input<{ $error: boolean; }>`
  font: inherit;
  letter-spacing: inherit;
  color: currentColor;
  padding: 4px 0 5px;
  box-sizing: content-box;
  background: none;
  height: 1.4375em;
  margin: 0;
  display: block;
  min-width: 0;
  width: calc(100% - 28px);
  padding: 12px;
  border-radius: 4px;
  border: solid 1px rgba(0, 0, 0, 0.23);
  &:focus {
    outline: 0;
    padding: 11px;
    border: solid 2px rgb(25, 118, 210);
  }
  ${(props) =>
    props.$error && `
      border: solid 1px red;
      &:focus {
        outline: 0;
        padding: 12px 11px;
        border: solid 2px red;
      }
  `}
`

const HelperStyled = styled.p`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
  color: red;
`

interface Props {
  disabled?: boolean;
  value?: string;
  helperText?: string;
  onChange: (event: any) => void;
  onBlur?: () => void;
}

const Input = forwardRef(({ disabled = false, value, helperText, onChange, onBlur }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <Container>
      <InputStyled $error={!!helperText} ref={ref} disabled={disabled} value={value} onChange={onChange} onBlur={onBlur} />
      {helperText && <HelperStyled>{helperText}</HelperStyled>}
    </Container>
  )
})

export default Input
