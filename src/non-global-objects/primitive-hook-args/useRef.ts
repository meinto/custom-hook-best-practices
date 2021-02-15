import { useMemorizedValue } from 'use-memorized-value'

export const name = 'mutable ref object reference'

export const useFail = (val: string) => ({ hello: val })

export const useSolution = (val: string) => {
  return useMemorizedValue({ hello: val })
}

