import { useMemo } from 'react'

export const name = 'memorized object reference'

export const useFail = (val: string) => ({ hello: val })

export const useSolution = (val: string ) => {
  // works on primitive values because of shallow compare
  const memorizedObject = useMemo(() => ({ hello: val }), [val])
  return memorizedObject
}

