import { useState } from 'react'
import { useSelector } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { rootReducer } from './redux'

export const useFail = () => {
  return useSelector<ReturnType<typeof rootReducer>>(state => state.list.filter((_, i) => i%2 === 0))
}


export const useSolution = () => {
  const filteredState = useSelector<ReturnType<typeof rootReducer>>(state => state.list.filter((_, i) => i % 2 === 0))
  const [filteredValue, setFilteredValue] = useState(filteredState)
  useDeepCompareEffect(() => {
    setFilteredValue(filteredState)
  }, [filteredState])
  return filteredValue
}