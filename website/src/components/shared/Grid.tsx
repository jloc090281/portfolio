import { ReactNode } from 'react'
import styled from 'styled-components'

import useScreenSize from 'hooks/useScreenSize'
import { MEDIA_QUERIES } from 'utils/constants'

const Container = styled.div<{ $width: string; $justifyContent: string; $alignItems: string; }>`
  display: flex;
  width: ${(props) => props.$width};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
`

interface Props {
  children: ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  justifyContent?: string;
  alignItems?: string;
}

const Grid = ({ children, xs, sm, md, lg, xl, justifyContent = 'flex-start', alignItems = 'flex-start' }: Props) => {
  const screenSize = useScreenSize()
  let width = 'auto'
  let spaces
  switch (screenSize) {
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
    <Container $width={width} $justifyContent={justifyContent} $alignItems={alignItems}>
      {children}
    </Container>
  )
}

export default Grid
