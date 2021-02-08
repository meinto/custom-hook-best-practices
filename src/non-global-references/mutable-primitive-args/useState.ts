import { useEffect, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

export const name = 'mutable state object reference'

export const useFail = (val: string) => ({ hello: val })

/**
 * This Solition is not optimal!
 * Use useRef instead (see ../mutable-object-args/useRef.ts)
 */
export const useSolution = (val: string) => {
  const [stateObject, setStateObject] = useState({ hello: val })
  useEffect(() => {
    setStateObject({ hello: val })
  }, [val])
  return stateObject
}

