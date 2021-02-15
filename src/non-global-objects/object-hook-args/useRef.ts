import { useMemorizedValue } from 'use-memorized-value'

export const name = 'mutable ref object reference'

export const useFail = (obj: { hello: string }) => obj

export const useSolution = (obj: { hello: string }) => {
  return useMemorizedValue(obj)
}

