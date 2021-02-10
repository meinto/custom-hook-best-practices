import { useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

export const name = 'mutable state object reference'

const sample = {
  hello: 'world'
}

export const useFail = (obj: { hello: string }) => obj

// Beware: This Solition triggeres an additional rerendering
export const useSolution = (obj: { hello: string }) => {
  const [stateObject, setStateObject] = useState(obj)
  useDeepCompareEffect(() => {
    setStateObject(obj)
  }, [obj])
  return stateObject
}

