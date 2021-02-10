import { useEffect, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

export const name = 'mutable state object reference'

export const useFail = (val: string) => ({ hello: val })

// Beware: This Solition triggeres an additional rerendering
export const useSolution = (val: string) => {
  const [stateObject, setStateObject] = useState({ hello: val })
  useEffect(() => {
    setStateObject({ hello: val })
  }, [val])
  return stateObject
}

