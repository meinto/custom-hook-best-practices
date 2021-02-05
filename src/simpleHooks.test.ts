import { useEffect } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import {
  useString,
  useNumber,
  useBoolean,
  useUndefined,
  useNull,
  useGlobalObject,
  useGlobalArray,
} from './simpleHooks'

describe('simple hooks (useEffect of useTestHook should be called only once)', () => {
  describe.each([
    ['useString', useString],
    ['useNumber', useNumber],
    ['useBoolean', useBoolean],
    ['useUndefined', useUndefined],
    ['useNull', useNull],
    ['useGlobalObject', useGlobalObject],
    ['useGlobalArray', useGlobalArray],
  ])('', (name, useHook) => {

    const effectTrigger = jest.fn()

    beforeEach(() => {
      effectTrigger.mockClear()
    })

    test(name, () => {
      const useTestHook = () => {
        const result = useHook()
        useEffect(() => effectTrigger(), [result])
      }
      const { rerender } = renderHook(() => useTestHook())
      expect(effectTrigger).toHaveBeenCalledTimes(1)
      rerender()
      expect(effectTrigger).toHaveBeenCalledTimes(1)
    })
  })
})