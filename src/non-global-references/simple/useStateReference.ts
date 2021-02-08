import { useState } from 'react'

export const name = 'state object reference'

const sample = {
  hello: 'world'
}

export const useFail = () => ({ ...sample })

/**
 * If you have mutate the object this solition is not optimal,
 *  because it triggers an additional rerender.
 * Use useRef instead (see mutableUseRefObjectArgReference.ts)
 */
export const useSolution = () => {
  const [stateObject] = useState({ ...sample })
  return stateObject
}

