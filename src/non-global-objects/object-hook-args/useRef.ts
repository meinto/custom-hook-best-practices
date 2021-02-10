import { useRef } from 'react'
import { dequal } from 'dequal'

export const name = 'mutable ref object reference'

const sample = {
  hello: 'world'
}

export const useFail = (obj: { hello: string }) => obj

export const useSolution = (obj: { hello: string }) => {
  const refObject = useRef(obj)
  if (!dequal(refObject.current, obj)) {
    refObject.current = obj
  }
  return refObject.current
}

