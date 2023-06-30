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
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.$transition}%);
`

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 15px);  
  z-index: 10;
  user-select: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background-color: rgb(25, 118, 210);
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    text-decoration: none;
    background-color: rgb(21, 101, 192);
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
  }
  @media (hover: hover) {
    cursor: pointer;
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
  onMoveCallback?: (id: number) => void;
}

interface List {
  id: string;
  offset: number;
  elm: ReactNode;
}

export const Carousel = ({ list, onMoveCallback }: Props) => {
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
    onMoveCallback && onMoveCallback(index)
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
    onMoveCallback && onMoveCallback(index)
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
