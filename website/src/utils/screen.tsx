import { MEDIA_QUERIES } from 'utils/constants'

export const getScreenBreakpoint = () => {
  const xsScreen = window.matchMedia('(max-width: 480px)').matches
  const smScreen = window.matchMedia('(max-width: 768px)').matches
  const mdScreen = window.matchMedia('(max-width: 1024px)').matches
  const lgScreen = window.matchMedia('(max-width: 1280px)').matches
  if (xsScreen) return MEDIA_QUERIES.XS
  else if (smScreen) return MEDIA_QUERIES.SM
  else if (mdScreen) return MEDIA_QUERIES.MD
  else if (lgScreen) return MEDIA_QUERIES.LG
  else return MEDIA_QUERIES.XL
}