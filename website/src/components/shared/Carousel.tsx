import { ReactNode, useState, useEffect } from 'react'
import styled from 'styled-components'

import rightArrow from 'assets/right-arrow.svg'
import leftArrow from 'assets/left-arrow.svg'

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  background-color: #FFF;
  border-radius: 5px;
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
  z-index: 1;
  user-select: none;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(189,189,189);
  background-color: rgb(224,224,224);
  box-shadow: none;
  ${(props) =>
    !props.disabled && `
      cursor: default;
      color: #fff;
      background-color: rgb(25, 118, 210);
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      &:hover {
        text-decoration: none;
        background-color: rgb(21, 101, 192);
        box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
      }
      @media (hover: hover) {
        cursor: pointer;
      }
      &:disabled {
        text-decoration: none;
        background-color: rgb(21, 101, 192);
        box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
      }
    `
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

const Carousel = ({ list, onMoveCallback }: Props) => {
  const [current, setCurrent] = useState(0)
  const [slideList, setList] = useState<List[]>([])
  
  useEffect(() => {
    if (list.length > 0) {
      if (list.length > 1) {
        setList([
          { id: crypto.randomUUID(), offset: -120, elm: list[current === 0 ? list.length - 1 : current - 1] },
          { id: crypto.randomUUID(), offset: 0, elm: list[current] },
          { id: crypto.randomUUID(), offset: 120, elm: list[current === list.length - 1 ? 0 : current + 1] }
        ])
      } else {
        setList([{ id: crypto.randomUUID(), offset: 0, elm: list[current] }])
      }
    }
  }, [list.length])

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
      { id: crypto.randomUUID(), offset: 120, elm: list[next] }
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
      <PrevButton disabled={list.length <= 1} onClick={prevSlide}><img src={leftArrow} /></PrevButton>
      <NextButton disabled={list.length <= 1} onClick={nextSlide}><img src={rightArrow} /></NextButton>
    </Container>
  )
}

export default Carousel
