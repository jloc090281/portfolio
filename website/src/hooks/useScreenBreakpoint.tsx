import { useState, useEffect } from 'react'

import { getScreenBreakpoint } from 'utils/screen'
import { MEDIA_QUERIES } from 'utils/constants'

const useScreenBreakpoint = () => {
  const [screenBreakpoint, setScreenBreakpoint] = useState(MEDIA_QUERIES.XS)
  let screenSize = window.innerWidth
  useEffect(() => {
    window.addEventListener("resize", () => {
      screenSize = window.innerWidth
      setScreenBreakpoint(getScreenBreakpoint)
    });
    return () => {
      window.removeEventListener("resize", () => {
        screenSize = window.innerWidth
        setScreenBreakpoint(getScreenBreakpoint)
      })
    }
  }, [screenSize]);
  
  return screenBreakpoint
}

export default useScreenBreakpoint
