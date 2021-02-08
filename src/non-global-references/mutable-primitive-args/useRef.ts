import { useRef } from 'react'

export const name = 'mutable ref object reference'

export const useFail = (val: string) => ({ hello: val })

export const useSolution = (val: string) => {
  const refObject = useRef({ hello: val })
  if (refObject.current.hello !== val) {
    refObject.current = { hello: val }
  }
  return refObject.current
}

