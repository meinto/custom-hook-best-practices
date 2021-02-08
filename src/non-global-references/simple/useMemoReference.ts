import { useMemo } from 'react'

export const name = 'memorized object reference'

const sample = {
  hello: 'world'
}

export const useFail = () => ({ ...sample })

/**
 * If you have mutate the object this solition is not optimal,
 *  because it triggers an additional rerender.
 * Problem described in mutableUseMemoObjectArgReference.ts
 * Use useRef instead (see mutableUseRefObjectArgReference.ts)
 */
export const useSolution = () => {
  const memorizedObject = useMemo(() => ({ ...sample }), [])
  return memorizedObject
}

