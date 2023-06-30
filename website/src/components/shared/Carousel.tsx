import { ReactNode, useState, useEffect } from 'react'
import styled from 'styled-components'

import rightArrow from 'assets/right-arrow.svg'
import leftArrow from 'assets/left-arrow.svg'

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  background-color: #FFF;
  position: relative;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Slide = styled.div<{ $transition: number; }>`
  position: absolute;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  transition: transform 0.5s ease-out;
  transform: translateX(${(props) => props.$transition}%);
`

const ArrowButton = styled.button`
  display: flex;
  outline: none;
  background-color: #666;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 15px);
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  padding: 0;
  &: focus-visible {
    outline: none;
  }
`

const NextButton = styled(ArrowButton)`
  right: 2px;
`

const PrevButton = styled(ArrowButton)`
  left: 2px;
`

interface Props {
  list: JSX.Element[];
}

interface List {
  id: string;
  offset: number;
  elm: ReactNode;
}

export const Carousel = ({ list }: Props) => {
  const [current, setCurrent] = useState(0)
  const [slideList, setList] = useState<List[]>([])
  
  useEffect(() => {
    if (slideList.length === 0 && list.length > 0) {
      setList([
        { id: crypto.randomUUID(), offset: -120, elm: list[list.length - 1] },
        { id: crypto.randomUUID(), offset: 0, elm: list[0] },
        { id: crypto.randomUUID(), offset: 120, elm: list[1] }
      ])
    }
  }, [list])

  const prevSlide = () => {
    let index = current
    let next = 0
    if(current > 0) index = current - 1
    else index = list.length - 1
    if(index > 0) next = index - 1
    else next = list.length - 1
    setCurrent(index)
    setList([
      { id: crypto.randomUUID(), offset: -120, elm: list[next] },
      { ...slideList[0], offset: slideList[0].offset + 120 },
      { ...slideList[1], offset: slideList[1].offset + 120 }
    ])
  }

  const nextSlide = () => {
    let index = current
    let next = 0
    if(current < list.length - 1) index = current + 1
    else index = 0
    if(index < list.length - 1) next = index + 1
    else next = 0
    setCurrent(index)
    setList([
      { ...slideList[1], offset: slideList[1].offset - 120 },
      { ...slideList[2], offset: slideList[2].offset - 120 },
      { id: crypto.randomUUID(), offset: 120, elm: list[next] },
    ])
  }

  return (
    <Container>
      {slideList.map((item) => (
        <Slide key={item.id} $transition={item.offset}>
          {item.elm}
        </Slide>
      ))}
      <PrevButton onClick={prevSlide}><img src={leftArrow} /></PrevButton>
      <NextButton onClick={nextSlide}><img src={rightArrow} /></NextButton>
    </Container>
  )
}
