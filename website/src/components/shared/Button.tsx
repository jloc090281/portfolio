import styled from 'styled-components'

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  padding: 6px 16px;
  border-radius: 4px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(189,189,189);
  background-color: rgb(224,224,224);
  box-shadow: none;

  ${(props) =>
    !props.disabled && `
      color: #fff;
      background-color: rgb(25, 118, 210);
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      &:hover {
        text-decoration: none;
        background-color: rgb(21, 101, 192);
        box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
      }
    `
  }
`

interface Props {
  label: string;
  disabled: boolean;
  onClick?: () => void;
}

const Button = ({ label, disabled, onClick }: Props) => {
  return <ButtonStyled disabled={disabled} onClick={onClick}>{label}</ButtonStyled>
}

export default Button
