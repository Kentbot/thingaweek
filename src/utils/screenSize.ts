import React, {useEffect, useState} from 'react'
import debounce from 'lodash.debounce'

const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(globalThis?.window?.innerWidth)
  const handleWindowSizeChange = debounce(() => {
    console.log('resize')
    setWidth(window.innerWidth)
  }, 25)

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return (width <= 768)
}

export default useCheckMobileScreen