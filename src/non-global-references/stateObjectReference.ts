import { useState } from 'react'

export const name = 'state object reference'

const sample = {
  hello: 'world'
}

export const useFail = () => ({ ...sample })

export const useSolution = () => {
  const [stateObject] = useState({ ...sample })
  return stateObject
}

