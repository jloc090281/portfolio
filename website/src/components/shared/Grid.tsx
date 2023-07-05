import { ReactNode } from 'react'
import styled from 'styled-components'

import useScreenBreakpoint from 'hooks/useScreenBreakpoint'
import { MEDIA_QUERIES } from 'utils/constants'

const Container = styled.div<{ $width: string; $justifyContent: string; }>`
  display: flex;
  width: ${(props) => props.$width};
  justify-content: ${(props) => props.$justifyContent};
`

interface Props {
  children: ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  justifyContent?: string;
}

const Grid = ({ children, xs, sm, md, lg, xl, justifyContent = 'flex-start' }: Props) => {
  const screenBreakpoint = useScreenBreakpoint()
  let width = 'auto'
  let spaces
  switch (screenBreakpoint) {
    case MEDIA_QUERIES.XS:
      spaces = xs
      width = spaces ? `calc(100% / 12 * ${spaces});` : 'auto'
      break
    case MEDIA_QUERIES.SM:
      spaces = sm ?? xs
      width = spaces ? `calc(100% / 12 * ${spaces});` : 'auto'
      break
    case MEDIA_QUERIES.MD:
      spaces = md ?? sm ?? xs
      width = spaces ? `calc(100% / 12 * ${spaces});` : 'auto'
      break
    case MEDIA_QUERIES.LG:
      spaces = lg ?? md ?? sm ?? xs
      width = spaces ? `calc(100% / 12 * ${spaces});` : 'auto'
      break
    case MEDIA_QUERIES.XL:
      spaces = xl ?? lg ?? md ?? sm ?? xs
      width = spaces ? `calc(100% / 12 * ${spaces});` : 'auto'
      break
  }
  return (
    <Container $width={width} $justifyContent={justifyContent}>
      {children}
    </Container>
  )
}

export default Grid
