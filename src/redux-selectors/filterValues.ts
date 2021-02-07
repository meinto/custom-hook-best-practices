import { useRef } from 'react'
import { dequal } from 'dequal'
import { useSelector } from 'react-redux'
import { rootReducer } from './redux'

export const useFail = () => {
  return useSelector<ReturnType<typeof rootReducer>>(state => state.list.filter((_, i) => i%2 === 0))
}


export const useSolution = () => {
  const filteredState = useSelector<ReturnType<typeof rootReducer>>(state => state.list.filter((_, i) => i % 2 === 0))
  const filteredRef = useRef(filteredState)
  if (!dequal(filteredState, filteredRef.current)) {
    filteredRef.current = filteredState
  }
  return filteredRef.current
}