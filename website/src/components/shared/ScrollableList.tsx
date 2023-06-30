import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const DEFAULT_ANIMATION_LENGTH = 200;
const FADE = { IN: 1, OUT: 0 };

const Container = styled.main`
  background-color: #FFF;
  height: 100%;
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

const ScrollableContent = styled.main<{ $transition: string; $opacity: number; }>`
  background-color: #FFF;
  padding: 1rem 0;
  width: 100%;
  height: calc(100% - 5rem);
  overflow-y: auto;
  justify-content: center;
  transition: ${(props) => props.$transition};
  opacity: ${(props) => props.$opacity};
`

const ScrollableItem = styled.div`
  margin: auto;
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  &: last-child {
    margin-bottom: 0;
  }
`

interface Props {
  title?: string;
  list: JSX.Element[];
}

export const ScrollableList = ({ title, list }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ newList: list, direction: FADE.OUT })

  useEffect(() => {
    if (scrollRef?.current) scrollRef.current.scrollTo({top: 0, left: 0, behavior: 'smooth' })
    setState(prev => ({ ...prev, direction: FADE.OUT }))
    setTimeout(() => {
      setState({ newList: list, direction: FADE.IN })
    }, DEFAULT_ANIMATION_LENGTH)
  }, [list])

  const scrollableItems = state.newList.map((item, index) => (
    <ScrollableItem key={index}>
      {item}
    </ScrollableItem>
  ))

  return (
    <Container>
      {title && <SubTitle>Comments</SubTitle>}
      <ScrollableContent
        $transition={`opacity ${DEFAULT_ANIMATION_LENGTH}ms ease-in`}
        $opacity={state.direction}
        ref={scrollRef}
      >
        {scrollableItems}
      </ScrollableContent>
    </Container>
  )
}
