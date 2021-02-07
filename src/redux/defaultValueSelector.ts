import { useSelector } from 'react-redux'
import { rootReducer } from './redux'

export const useFail = () => {
  return useSelector<ReturnType<typeof rootReducer>>(state => state.counter?.value1 ?? { count: 0 })
}

const defaultValue = { count: 0 }
export const useSolution = () => {
  return useSelector<ReturnType<typeof rootReducer>>(state => state.counter?.value1 ?? defaultValue)
}