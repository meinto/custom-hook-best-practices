import { useEffect } from 'react'
import { renderHook } from '@testing-library/react-hooks'

import {
  useString,
  useNumber,
  useBoolean,
  useUndefined,
  useNull,
} from './primitives'
import {
  useGlobalObject,
  useGlobalArray,
  useNestedGlobalObject,
  useNestedGlobalObjectClone,
  useNestedGlobalArray,
  useNestedGlobalArrayClone,
} from './globalObjects'

describe('simple hooks (useEffect of useTestHook should be called only once)', () => {
  describe.each([
    ['useString', useString],
    ['useNumber', useNumber],
    ['useBoolean', useBoolean],
    ['useUndefined', useUndefined],
    ['useNull', useNull],
    ['useGlobalObject', useGlobalObject],
    ['useGlobalArray', useGlobalArray],
    ['useNestedGlobalObject', useNestedGlobalObject],
    ['useNestedGlobalObjectClone', useNestedGlobalObjectClone],
    ['useNestedGlobalArray', useNestedGlobalArray],
    ['useNestedGlobalArrayClone', useNestedGlobalArrayClone],
  ])('', (name, useHook) => {

    const effectTriggered = jest.fn()

    beforeEach(() => {
      effectTriggered.mockClear()
    })

    test(name, () => {
      const useTestHook = () => {
        const result = useHook()
        useEffect(() => effectTriggered(), [result])
      }
      const { rerender } = renderHook(() => useTestHook())
      expect(effectTriggered).toHaveBeenCalledTimes(1)
      rerender()
      expect(effectTriggered).toHaveBeenCalledTimes(1)
    })
  })
})