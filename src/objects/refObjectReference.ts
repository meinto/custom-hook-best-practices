import { useRef } from 'react'

export const name = 'ref object reference'

const sample = {
  hello: 'world'
}

export const useFail = () => ({ ...sample })

export const useInstead = () => {
  const refObject = useRef({ ...sample })
  return refObject.current
}

