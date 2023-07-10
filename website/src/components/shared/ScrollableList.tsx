import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const DEFAULT_ANIMATION_LENGTH = 200;
const FADE = { IN: 1, OUT: 0 };

const Container = styled.main`
  background-color: #FFF;
  border-radius: 5px;
  height: calc(100% - 1rem);
  width: 100%;
  padding: 0.5rem 0;
`

const SubTitle = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin: 0;
  color: #5588d3;
  font-size: 1.4rem;
  font-weight: 300;
`

const ScrollableContent = styled.main<{ $hasTitle: boolean; $transition: string; $opacity: number; $columnsPerLine: number; }>`
  display: flex;
  flex-wrap: ${(props) => props.$columnsPerLine > 1 ? 'wrap' : 'nowrap'};
  flex-direction: ${(props) => props.$columnsPerLine > 1 ? 'row' : 'column'};
  align-items: stretch;
  gap: 1rem;
  padding: 0.5rem 1rem;
  width: calc(100% - 2rem);
  height: calc(100% - ${(props) => props.$hasTitle ? '4' : '1'}rem);
  border-radius: 5px;
  overflow-y: auto;
  transition: ${(props) => props.$transition};
  opacity: ${(props) => props.$opacity};
`

const ScrollableItem = styled.div<{ $columnsPerLine: number; }>`
  width: ${(props) => props.$columnsPerLine > 1 ? `calc((100% - ${props.$columnsPerLine - 1}rem) / ${props.$columnsPerLine})` : '100%'};
  height: ${(props) => props.$columnsPerLine > 1 ? '100%' : 'fit-content'};
`

interface Props {
  title?: string;
  columnsPerLine?: number;
  autoScrollEnabled?: boolean;
  list: JSX.Element[];
}

const ScrollableList = ({ title, columnsPerLine = 1, autoScrollEnabled = false, list }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ newList: list, direction: FADE.OUT })

  useEffect(() => {
    setState(prev => ({ ...prev, direction: FADE.OUT }))
    setTimeout(() => {
      if (scrollRef?.current && autoScrollEnabled) scrollRef.current.scrollTo({top: 0, left: 0 })
      setState({ newList: list, direction: FADE.IN })
    }, DEFAULT_ANIMATION_LENGTH)
  }, [list.length])

  const scrollableItems = state.newList.map((item, index) => (
    <ScrollableItem key={index} $columnsPerLine={columnsPerLine}>
      {item}
    </ScrollableItem>
  ))

  return (
    <Container>
      {title && <SubTitle>Comments</SubTitle>}
      <ScrollableContent
        $columnsPerLine={columnsPerLine}
        $hasTitle={!!title}
        $transition={`opacity ${DEFAULT_ANIMATION_LENGTH}ms ease-in`}
        $opacity={state.direction}
        ref={scrollRef}
      >
        {scrollableItems}
      </ScrollableContent>
    </Container>
  )
}

export default ScrollableList 
